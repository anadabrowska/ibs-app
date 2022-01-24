import {
  HttpLink,
  ApolloLink,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";
import QueueLink from "apollo-link-queue";
import SerializingLink from "apollo-link-serialize";
import { RetryLink } from "@apollo/client/link/retry";
import { CachePersistor, LocalStorageWrapper } from "apollo3-cache-persist";
import { onError } from "@apollo/client/link/error";
import Router from "next/router";

// TODO: jak sie zmienia schemat trzeba zupdate'owac
const SCHEMA_VERSION = "1.0";
const SCHEMA_VERSION_KEY = "apollo-schema-version";

export const createApolloClient = async () => {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:4000/graphql",
    credentials: "include",
  });

  const retryLink = new RetryLink({ attempts: { max: Infinity } });

  const onErrorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message }) => {
        if (message.includes("not authenticated")) {
          Router.replace("/login");
        }
      });
  });

  const queueLink = new QueueLink();

  window.addEventListener("offline", () => {
    console.log("app going offline...");
    queueLink.close();
  });
  window.addEventListener("online", () => {
    console.log("app going online...");
    queueLink.open();
  });

  const serializingLink = new SerializingLink();

  const cache = new InMemoryCache();

  const persistor = new CachePersistor({
    cache,
    storage: new LocalStorageWrapper(window.localStorage),
  });

  const trackerLink = new ApolloLink((operation, forward) => {
    if (forward === undefined) return null;

    const context = operation.getContext();
    const trackedQueries =
      JSON.parse(window.localStorage.getItem("trackedQueries") || "[]") || [];

    if (context.tracked !== undefined) {
      const { operationName, query, variables } = operation;

      const newTrackedQuery = {
        query,
        variables,
        operationName,
      };

      window.localStorage.setItem(
        "trackedQueries",
        JSON.stringify([...trackedQueries, newTrackedQuery])
      );
    }

    return forward(operation).map((data) => {
      if (context.tracked !== undefined) {
        window.localStorage.setItem(
          "trackedQueries",
          JSON.stringify(trackedQueries)
        );
      }

      return data;
    });
  });

  const link = ApolloLink.from([
    trackerLink,
    queueLink,
    serializingLink,
    retryLink,
    onErrorLink,
    httpLink,
  ]);

  const currentVersion = window.localStorage.getItem(SCHEMA_VERSION_KEY);
  if (currentVersion === SCHEMA_VERSION) {
    await persistor.restore();
  } else {
    await persistor.purge();
    window.localStorage.setItem(SCHEMA_VERSION_KEY, SCHEMA_VERSION);
  }

  const client = new ApolloClient({
    link,
    cache,
  });

  return {
    client,
    persistor,
    cache,
  };
};
