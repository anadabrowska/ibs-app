import {
  ApolloCache,
  ApolloClient,
  FetchResult,
  NormalizedCacheObject,
} from "@apollo/client";
import { DayFormDocument, Form, FormResponse } from "../generated/graphql";

type CacheType = ApolloCache<any>;
type ContextType = Omit<
  FetchResult<any, Record<string, any>, Record<string, any>>,
  "context"
>;

export const dayFormOptimistic = (formState: any): FormResponse => {
  const optimisticId = new Date().getTime() * -1;

  return {
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
  };
};

export const dayFormRead = (cache: CacheType, date?: Date) => {
  const dateObj = date || new Date();
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  const dateStr = `${year}-${month}-${day}`;

  return cache.readQuery({
    query: DayFormDocument,
    variables: { date: dateStr },
  });
};

export const dayFormUpdate = (cache: CacheType, context: ContextType) => {
  const dayForm: Form =
    (context as any).data?.createForm?.form ||
    (context as any).data?.updateForm?.form;

  let date = undefined;
  if (dayForm?.createdAt) date = new Date(parseInt(dayForm.createdAt));

  const dateObj = date || new Date();
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  const dateStr = `${year}-${month}-${day}`;

  cache.writeQuery({
    query: DayFormDocument,
    variables: { date: dateStr },
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
    dayFormUpdate(cache, {
      data: { createForm: dayFormOptimistic(formState) },
    });
  } else if (operationName === "updateForm") {
    dayFormUpdate(cache, {
      data: { updateForm: dayFormOptimistic(formState) },
    });
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
    optimisticResponse = { createForm: dayFormOptimistic(formState) };
    updateFunction = dayFormUpdate;
  } else if (operationName === "updateForm") {
    optimisticResponse = { updateForm: dayFormOptimistic(formState) };
    updateFunction = dayFormUpdate;
  }

  return client.mutate({
    variables,
    mutation: query,
    optimisticResponse,
    update: updateFunction,
  });
};
