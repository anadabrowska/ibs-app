import {
  ApolloCache,
  ApolloClient,
  FetchResult,
  NormalizedCacheObject,
} from "@apollo/client";
import { CreateFormMutation, DayFormDocument } from "../generated/graphql";

type CacheType = ApolloCache<any>;
type ContextType = Omit<
  FetchResult<any, Record<string, any>, Record<string, any>>,
  "context"
>;

export const dayFormOptimistic = (formState: any): CreateFormMutation => {
  const optimisticId = new Date().getTime() * -1;

  return {
    createForm: {
      form: {
        id: optimisticId,
        createdAt: new Date().getTime().toString(),
        ...formState,
        symptoms: formState.symptoms.map((symptom: any) => ({
          id: optimisticId,
          ...symptom,
          __typename: "Symptom",
        })),
        activities: formState.activities.map((activity: any) => ({
          id: optimisticId,
          ...activity,
          __typename: "Activity",
        })),
        experiments: formState.experiments.map((experiment: any) => ({
          id: optimisticId,
          ...experiment,
          __typename: "ExperimentForm",
        })),
        __typename: "Form",
      },
      errors: [],
      __typename: "FormResponse",
    },
  };
};

export const dayFormUpdate = (cache: CacheType, context: ContextType) => {
  const dateObj = new Date();
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  const date = `${year}-${month}-${day}`;

  const dayForm = (context as any).data.createForm.form;

  cache.writeQuery({
    query: DayFormDocument,
    variables: { date },
    data: {
      dayForm: dayForm,
    },
  });
};

export const displayOfflineQuery = (cache: CacheType, offlineQuery: any) => {
  if (
    !offlineQuery?.operationName ||
    !offlineQuery?.variables ||
    !offlineQuery?.query
  )
    return;

  const { variables, operationName } = offlineQuery;

  const formState = variables.input;

  if (operationName === "createForm") {
    dayFormUpdate(cache, { data: { ...dayFormOptimistic(formState) } });
  }
};

export const processOfflineQuery = (
  client: ApolloClient<NormalizedCacheObject>,
  offlineQuery: any
) => {
  if (
    !offlineQuery?.operationName ||
    !offlineQuery?.variables ||
    !offlineQuery?.query
  )
    return;

  const { query, variables, operationName } = offlineQuery;

  const formState = variables.input;
  let optimisticResponse = undefined;
  let updateFunction = undefined;

  if (operationName === "createForm") {
    optimisticResponse = dayFormOptimistic(formState);
    updateFunction = dayFormUpdate;
  }

  return client.mutate({
    variables,
    mutation: query,
    optimisticResponse,
    update: updateFunction,
  });
};
