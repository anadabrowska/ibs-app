import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

export const processOfflineQuery = async (
  client: ApolloClient<NormalizedCacheObject>,
  offlineQuery: any
) => {
  if (
    !offlineQuery?.operationName ||
    !offlineQuery?.variables ||
    !offlineQuery?.query
  )
    return;

  const { query, variables } = offlineQuery;
  return client.mutate({
    mutation: query,
    variables,
  });
};
