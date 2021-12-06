import { createClient, dedupExchange, fetchExchange } from "urql";
import {
  LoginMutation,
  MeQuery,
  MeDocument,
  RegisterMutation,
  CreateFormMutation,
  DayFormQuery,
  DayFormDocument,
  UpdateFormMutation,
  useDayFormQuery,
} from "../generated/graphql";
import { pipe, tap } from "wonka";
import { Exchange } from "urql";
import Router from "next/router";
import { Cache, cacheExchange, QueryInput } from "@urql/exchange-graphcache";

const errorExchange: Exchange =
  ({ forward }) =>
  (ops$) => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        if (error?.message.includes("not authenticated")) {
          Router.replace("/login");
        }
      })
    );
  };

function updateQueryWithTypes<Result, Query>(
  cache: Cache,
  queryInput: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(
    queryInput,
    (data) => fn(result, data as any) as any
  );
}

export const urqlClient = createClient({
  url: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          login: (_result, _, cache, __) => {
            updateQueryWithTypes<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              }
            );
          },
          register: (_result, _, cache, __) => {
            updateQueryWithTypes<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register.user,
                  };
                }
              }
            );
          },
          logout: (_result, _, cache, __) => {
            updateQueryWithTypes<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ me: null })
            );
          },
          createForm: (result, _, cache, __) => {
            const currDate = parseInt(
              (result.createForm as any)?.createdAt as string
            );
            const date = currDate ? new Date(currDate) : new Date();
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();

            updateQueryWithTypes<CreateFormMutation, DayFormQuery>(
              cache,
              {
                query: DayFormDocument,
                variables: { date: `${year}-${month}-${day}` },
              },
              result,
              (_r, _q) => {
                return { dayForm: result.createForm } as any;
              }
            );
          },
          updateForm: (result, _, cache, __) => {
            const currDate = parseInt(
              (result.updateForm as any)?.createdAt as string
            );
            const date = currDate ? new Date(currDate) : new Date();
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();

            updateQueryWithTypes<UpdateFormMutation, DayFormQuery>(
              cache,
              {
                query: DayFormDocument,
                variables: { date: `${year}-${month}-${day}` },
              },
              result,
              (_r, _q) => {
                return { dayForm: result.updateForm } as any;
              }
            );
          },
        },
      },
    }),
    errorExchange,
    fetchExchange,
  ],
});
