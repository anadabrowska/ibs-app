import {
  HttpLink,
  ApolloLink,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import Router from "next/router";

export const createApolloClient = () => {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/graphql",
    credentials: "include",
  });

  const onErrorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message }) => {
        if (message.includes("not authenticated")) {
          Router.replace("/login");
        }
      });
  });

  const link = ApolloLink.from([onErrorLink, httpLink]);

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });

  return client;
};
