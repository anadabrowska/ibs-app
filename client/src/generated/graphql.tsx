import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ActionResponse = {
  __typename?: 'ActionResponse';
  errors?: Maybe<Array<FieldError>>;
  success?: Maybe<Scalars['Boolean']>;
};

export type Activity = {
  __typename?: 'Activity';
  formId: Scalars['Float'];
  id: Scalars['Float'];
  moodAfter: Scalars['Float'];
  time: Scalars['Float'];
  type: Scalars['String'];
};

export type ActivityInput = {
  moodAfter: Scalars['Float'];
  time: Scalars['Float'];
  type: Scalars['String'];
};

export type EndExperimentInput = {
  isTolerable?: Maybe<Scalars['Boolean']>;
  notes?: Maybe<Scalars['String']>;
  productName: Scalars['String'];
  quantity?: Maybe<Scalars['String']>;
};

export type Experiment = {
  __typename?: 'Experiment';
  creatorId: Scalars['Float'];
  endDate?: Maybe<Scalars['String']>;
  experimentForms?: Maybe<Array<ExperimentForm>>;
  id: Scalars['Float'];
  isTolerable?: Maybe<Scalars['Boolean']>;
  notes?: Maybe<Scalars['String']>;
  productName: Scalars['String'];
  quantity?: Maybe<Scalars['String']>;
  startDate: Scalars['String'];
};

export type ExperimentForm = {
  __typename?: 'ExperimentForm';
  createdAt: Scalars['String'];
  experimentId: Scalars['Float'];
  formId: Scalars['Float'];
  generalSensation: Scalars['Float'];
  id: Scalars['Float'];
  productName: Scalars['String'];
  quantity: Scalars['String'];
};

export type ExperimentInput = {
  experimentId: Scalars['Float'];
  generalSensation: Scalars['Float'];
  productName: Scalars['String'];
  quantity: Scalars['String'];
};

export type ExperimentResponse = {
  __typename?: 'ExperimentResponse';
  errors?: Maybe<Array<FieldError>>;
  experiment?: Maybe<Experiment>;
};

export type FieldError = {
  __typename?: 'FieldError';
  errorId: Scalars['String'];
  fieldName: Scalars['String'];
  message: Scalars['String'];
};

export type Form = {
  __typename?: 'Form';
  activities?: Maybe<Array<Activity>>;
  createdAt: Scalars['String'];
  creatorId: Scalars['Float'];
  dayRate: Scalars['Float'];
  experiments?: Maybe<Array<ExperimentForm>>;
  id: Scalars['Float'];
  inTherapy: Scalars['Boolean'];
  menstruation?: Maybe<Scalars['Boolean']>;
  migraine: Scalars['Boolean'];
  mood: Scalars['Float'];
  notes?: Maybe<Scalars['String']>;
  pollakiuria: Scalars['Boolean'];
  sleepLenght: Scalars['Float'];
  sleepQuality: Scalars['Float'];
  stoolTypes: Array<Scalars['Float']>;
  stressLevel: Scalars['Float'];
  symptoms?: Maybe<Array<Symptom>>;
  updatedAt: Scalars['String'];
  weight: Scalars['Float'];
};

export type FormInput = {
  activities?: Maybe<Array<ActivityInput>>;
  dayRate: Scalars['Float'];
  experiments?: Maybe<Array<ExperimentInput>>;
  inTherapy: Scalars['Boolean'];
  menstruation?: Maybe<Scalars['Boolean']>;
  migraine: Scalars['Boolean'];
  mood: Scalars['Float'];
  notes?: Maybe<Scalars['String']>;
  pollakiuria: Scalars['Boolean'];
  sleepLenght: Scalars['Float'];
  sleepQuality: Scalars['Float'];
  stoolTypes: Array<Scalars['Float']>;
  stressLevel: Scalars['Float'];
  symptoms?: Maybe<Array<SymptomInput>>;
  weight: Scalars['Float'];
};

export type FormResponse = {
  __typename?: 'FormResponse';
  errors?: Maybe<Array<FieldError>>;
  form?: Maybe<Form>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  createForm: FormResponse;
  endExperiment: ExperimentResponse;
  forgotPassword: ActionResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  startExperiment: ExperimentResponse;
  updateForm: FormResponse;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateFormArgs = {
  input: FormInput;
};


export type MutationEndExperimentArgs = {
  id: Scalars['Int'];
  input: EndExperimentInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationStartExperimentArgs = {
  input: StartExperimentInput;
};


export type MutationUpdateFormArgs = {
  date: Scalars['String'];
  input: FormInput;
};

export type Query = {
  __typename?: 'Query';
  closedExperiments?: Maybe<Array<Experiment>>;
  dayForm?: Maybe<Form>;
  experiment?: Maybe<Experiment>;
  experimentForms?: Maybe<Array<ExperimentForm>>;
  formsFromTimeRange?: Maybe<Array<Form>>;
  me?: Maybe<User>;
  openExperiments?: Maybe<Array<Experiment>>;
};


export type QueryDayFormArgs = {
  date: Scalars['String'];
};


export type QueryExperimentArgs = {
  id: Scalars['Int'];
};


export type QueryExperimentFormsArgs = {
  id: Scalars['Int'];
};


export type QueryFormsFromTimeRangeArgs = {
  after: Scalars['String'];
  before: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type StartExperimentInput = {
  productName: Scalars['String'];
};

export type Symptom = {
  __typename?: 'Symptom';
  formId: Scalars['Float'];
  id: Scalars['Float'];
  intensity: Scalars['Float'];
  isDangerous?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
};

export type SymptomInput = {
  intensity: Scalars['Float'];
  isDangerous?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender: Scalars['String'];
  id: Scalars['Float'];
  lastName: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FormDataFragment = { __typename?: 'Form', id: number, createdAt: string, dayRate: number, weight: number, stoolTypes: Array<number>, sleepLenght: number, sleepQuality: number, mood: number, stressLevel: number, inTherapy: boolean, menstruation?: Maybe<boolean>, migraine: boolean, pollakiuria: boolean, notes?: Maybe<string>, symptoms?: Maybe<Array<{ __typename?: 'Symptom', id: number, name: string, intensity: number, isDangerous?: Maybe<boolean> }>>, activities?: Maybe<Array<{ __typename?: 'Activity', id: number, type: string, moodAfter: number, time: number }>>, experiments?: Maybe<Array<{ __typename?: 'ExperimentForm', experimentId: number, quantity: string, productName: string, generalSensation: number }>> };

export type FormInputFragment = { __typename?: 'Form', id: number, createdAt: string, dayRate: number, weight: number, stoolTypes: Array<number>, sleepLenght: number, sleepQuality: number, mood: number, stressLevel: number, inTherapy: boolean, menstruation?: Maybe<boolean>, migraine: boolean, pollakiuria: boolean, notes?: Maybe<string>, symptoms?: Maybe<Array<{ __typename?: 'Symptom', name: string, intensity: number, isDangerous?: Maybe<boolean> }>>, activities?: Maybe<Array<{ __typename?: 'Activity', type: string, moodAfter: number, time: number }>>, experiments?: Maybe<Array<{ __typename?: 'ExperimentForm', experimentId: number, quantity: string, productName: string, generalSensation: number }>> };

export type StarndardErrorFragment = { __typename?: 'FieldError', fieldName: string, errorId: string, message: string };

export type StandardUserFragment = { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, gender: string };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', fieldName: string, errorId: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, firstName: string, lastName: string, email: string, gender: string }> } };

export type CreateFormMutationVariables = Exact<{
  input: FormInput;
}>;


export type CreateFormMutation = { __typename?: 'Mutation', createForm: { __typename?: 'FormResponse', form?: Maybe<{ __typename?: 'Form', id: number, createdAt: string, dayRate: number, weight: number, stoolTypes: Array<number>, sleepLenght: number, sleepQuality: number, mood: number, stressLevel: number, inTherapy: boolean, menstruation?: Maybe<boolean>, migraine: boolean, pollakiuria: boolean, notes?: Maybe<string>, symptoms?: Maybe<Array<{ __typename?: 'Symptom', id: number, name: string, intensity: number, isDangerous?: Maybe<boolean> }>>, activities?: Maybe<Array<{ __typename?: 'Activity', id: number, type: string, moodAfter: number, time: number }>>, experiments?: Maybe<Array<{ __typename?: 'ExperimentForm', experimentId: number, quantity: string, productName: string, generalSensation: number }>> }>, errors?: Maybe<Array<{ __typename?: 'FieldError', fieldName: string, errorId: string, message: string }>> } };

export type EndExperimentMutationVariables = Exact<{
  input: EndExperimentInput;
  id: Scalars['Int'];
}>;


export type EndExperimentMutation = { __typename?: 'Mutation', endExperiment: { __typename?: 'ExperimentResponse', experiment?: Maybe<{ __typename?: 'Experiment', id: number, productName: string, startDate: string, endDate?: Maybe<string>, notes?: Maybe<string>, quantity?: Maybe<string>, isTolerable?: Maybe<boolean> }>, errors?: Maybe<Array<{ __typename?: 'FieldError', fieldName: string, errorId: string, message: string }>> } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'ActionResponse', success?: Maybe<boolean>, errors?: Maybe<Array<{ __typename?: 'FieldError', fieldName: string, errorId: string, message: string }>> } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', fieldName: string, errorId: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, firstName: string, lastName: string, email: string, gender: string }> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  gender: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', user?: Maybe<{ __typename?: 'User', id: number, firstName: string, lastName: string, email: string, gender: string }>, errors?: Maybe<Array<{ __typename?: 'FieldError', fieldName: string, errorId: string, message: string }>> } };

export type StartExperimentMutationVariables = Exact<{
  input: StartExperimentInput;
}>;


export type StartExperimentMutation = { __typename?: 'Mutation', startExperiment: { __typename?: 'ExperimentResponse', experiment?: Maybe<{ __typename?: 'Experiment', id: number, productName: string, startDate: string }>, errors?: Maybe<Array<{ __typename?: 'FieldError', fieldName: string, errorId: string, message: string }>> } };

export type UpdateFormMutationVariables = Exact<{
  input: FormInput;
  date: Scalars['String'];
}>;


export type UpdateFormMutation = { __typename?: 'Mutation', updateForm: { __typename?: 'FormResponse', form?: Maybe<{ __typename?: 'Form', id: number, createdAt: string, dayRate: number, weight: number, stoolTypes: Array<number>, sleepLenght: number, sleepQuality: number, mood: number, stressLevel: number, inTherapy: boolean, menstruation?: Maybe<boolean>, migraine: boolean, pollakiuria: boolean, notes?: Maybe<string>, symptoms?: Maybe<Array<{ __typename?: 'Symptom', id: number, name: string, intensity: number, isDangerous?: Maybe<boolean> }>>, activities?: Maybe<Array<{ __typename?: 'Activity', id: number, type: string, moodAfter: number, time: number }>>, experiments?: Maybe<Array<{ __typename?: 'ExperimentForm', experimentId: number, quantity: string, productName: string, generalSensation: number }>> }>, errors?: Maybe<Array<{ __typename?: 'FieldError', fieldName: string, errorId: string, message: string }>> } };

export type ClosedExperimentsQueryVariables = Exact<{ [key: string]: never; }>;


export type ClosedExperimentsQuery = { __typename?: 'Query', closedExperiments?: Maybe<Array<{ __typename?: 'Experiment', id: number, productName: string, startDate: string, endDate?: Maybe<string>, notes?: Maybe<string>, quantity?: Maybe<string>, isTolerable?: Maybe<boolean> }>> };

export type DatesFromTimeRangeQueryVariables = Exact<{
  before: Scalars['String'];
  after: Scalars['String'];
}>;


export type DatesFromTimeRangeQuery = { __typename?: 'Query', formsFromTimeRange?: Maybe<Array<{ __typename?: 'Form', id: number, createdAt: string }>> };

export type DayFormQueryVariables = Exact<{
  date: Scalars['String'];
}>;


export type DayFormQuery = { __typename?: 'Query', dayForm?: Maybe<{ __typename?: 'Form', id: number, createdAt: string, dayRate: number, weight: number, stoolTypes: Array<number>, sleepLenght: number, sleepQuality: number, mood: number, stressLevel: number, inTherapy: boolean, menstruation?: Maybe<boolean>, migraine: boolean, pollakiuria: boolean, notes?: Maybe<string>, symptoms?: Maybe<Array<{ __typename?: 'Symptom', id: number, name: string, intensity: number, isDangerous?: Maybe<boolean> }>>, activities?: Maybe<Array<{ __typename?: 'Activity', id: number, type: string, moodAfter: number, time: number }>>, experiments?: Maybe<Array<{ __typename?: 'ExperimentForm', experimentId: number, quantity: string, productName: string, generalSensation: number }>> }> };

export type ExperimentQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ExperimentQuery = { __typename?: 'Query', experiment?: Maybe<{ __typename?: 'Experiment', id: number, productName: string, startDate: string }> };

export type ExperimentFormsQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ExperimentFormsQuery = { __typename?: 'Query', experimentForms?: Maybe<Array<{ __typename?: 'ExperimentForm', createdAt: string, productName: string, quantity: string, generalSensation: number }>> };

export type FormsFromTimeRangeQueryVariables = Exact<{
  before: Scalars['String'];
  after: Scalars['String'];
}>;


export type FormsFromTimeRangeQuery = { __typename?: 'Query', formsFromTimeRange?: Maybe<Array<{ __typename?: 'Form', id: number, createdAt: string, dayRate: number, weight: number, stoolTypes: Array<number>, sleepLenght: number, sleepQuality: number, mood: number, stressLevel: number, inTherapy: boolean, menstruation?: Maybe<boolean>, migraine: boolean, pollakiuria: boolean, notes?: Maybe<string>, symptoms?: Maybe<Array<{ __typename?: 'Symptom', id: number, name: string, intensity: number, isDangerous?: Maybe<boolean> }>>, activities?: Maybe<Array<{ __typename?: 'Activity', id: number, type: string, moodAfter: number, time: number }>>, experiments?: Maybe<Array<{ __typename?: 'ExperimentForm', experimentId: number, quantity: string, productName: string, generalSensation: number }>> }>> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: number, firstName: string, lastName: string, email: string, gender: string }> };

export type OpenExperimentsQueryVariables = Exact<{ [key: string]: never; }>;


export type OpenExperimentsQuery = { __typename?: 'Query', openExperiments?: Maybe<Array<{ __typename?: 'Experiment', id: number, productName: string, startDate: string }>> };

export const FormDataFragmentDoc = gql`
    fragment FormData on Form {
  id
  createdAt
  dayRate
  weight
  symptoms {
    id
    name
    intensity
    isDangerous
  }
  stoolTypes
  sleepLenght
  sleepQuality
  mood
  stressLevel
  activities {
    id
    type
    moodAfter
    time
  }
  experiments {
    experimentId
    quantity
    productName
    generalSensation
  }
  inTherapy
  menstruation
  migraine
  pollakiuria
  notes
}
    `;
export const FormInputFragmentDoc = gql`
    fragment FormInput on Form {
  id
  createdAt
  dayRate
  weight
  symptoms {
    name
    intensity
    isDangerous
  }
  stoolTypes
  sleepLenght
  sleepQuality
  mood
  stressLevel
  activities {
    type
    moodAfter
    time
  }
  experiments {
    experimentId
    quantity
    productName
    generalSensation
  }
  inTherapy
  menstruation
  migraine
  pollakiuria
  notes
}
    `;
export const StarndardErrorFragmentDoc = gql`
    fragment StarndardError on FieldError {
  fieldName
  errorId
  message
}
    `;
export const StandardUserFragmentDoc = gql`
    fragment StandardUser on User {
  id
  firstName
  lastName
  email
  gender
}
    `;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    errors {
      ...StarndardError
    }
    user {
      ...StandardUser
    }
  }
}
    ${StarndardErrorFragmentDoc}
${StandardUserFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateFormDocument = gql`
    mutation createForm($input: FormInput!) {
  createForm(input: $input) {
    form {
      ...FormData
    }
    errors {
      ...StarndardError
    }
  }
}
    ${FormDataFragmentDoc}
${StarndardErrorFragmentDoc}`;
export type CreateFormMutationFn = Apollo.MutationFunction<CreateFormMutation, CreateFormMutationVariables>;

/**
 * __useCreateFormMutation__
 *
 * To run a mutation, you first call `useCreateFormMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFormMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFormMutation, { data, loading, error }] = useCreateFormMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateFormMutation(baseOptions?: Apollo.MutationHookOptions<CreateFormMutation, CreateFormMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFormMutation, CreateFormMutationVariables>(CreateFormDocument, options);
      }
export type CreateFormMutationHookResult = ReturnType<typeof useCreateFormMutation>;
export type CreateFormMutationResult = Apollo.MutationResult<CreateFormMutation>;
export type CreateFormMutationOptions = Apollo.BaseMutationOptions<CreateFormMutation, CreateFormMutationVariables>;
export const EndExperimentDocument = gql`
    mutation EndExperiment($input: EndExperimentInput!, $id: Int!) {
  endExperiment(input: $input, id: $id) {
    experiment {
      id
      productName
      startDate
      endDate
      notes
      quantity
      isTolerable
    }
    errors {
      ...StarndardError
    }
  }
}
    ${StarndardErrorFragmentDoc}`;
export type EndExperimentMutationFn = Apollo.MutationFunction<EndExperimentMutation, EndExperimentMutationVariables>;

/**
 * __useEndExperimentMutation__
 *
 * To run a mutation, you first call `useEndExperimentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEndExperimentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [endExperimentMutation, { data, loading, error }] = useEndExperimentMutation({
 *   variables: {
 *      input: // value for 'input'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEndExperimentMutation(baseOptions?: Apollo.MutationHookOptions<EndExperimentMutation, EndExperimentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EndExperimentMutation, EndExperimentMutationVariables>(EndExperimentDocument, options);
      }
export type EndExperimentMutationHookResult = ReturnType<typeof useEndExperimentMutation>;
export type EndExperimentMutationResult = Apollo.MutationResult<EndExperimentMutation>;
export type EndExperimentMutationOptions = Apollo.BaseMutationOptions<EndExperimentMutation, EndExperimentMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    errors {
      ...StarndardError
    }
    success
  }
}
    ${StarndardErrorFragmentDoc}`;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(input: {email: $email, password: $password}) {
    errors {
      ...StarndardError
    }
    user {
      ...StandardUser
    }
  }
}
    ${StarndardErrorFragmentDoc}
${StandardUserFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($firstName: String!, $lastName: String!, $gender: String!, $email: String!, $password: String!) {
  register(
    input: {firstName: $firstName, lastName: $lastName, gender: $gender, email: $email, password: $password}
  ) {
    user {
      ...StandardUser
    }
    errors {
      ...StarndardError
    }
  }
}
    ${StandardUserFragmentDoc}
${StarndardErrorFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      gender: // value for 'gender'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const StartExperimentDocument = gql`
    mutation StartExperiment($input: StartExperimentInput!) {
  startExperiment(input: $input) {
    experiment {
      id
      productName
      startDate
    }
    errors {
      ...StarndardError
    }
  }
}
    ${StarndardErrorFragmentDoc}`;
export type StartExperimentMutationFn = Apollo.MutationFunction<StartExperimentMutation, StartExperimentMutationVariables>;

/**
 * __useStartExperimentMutation__
 *
 * To run a mutation, you first call `useStartExperimentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartExperimentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startExperimentMutation, { data, loading, error }] = useStartExperimentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useStartExperimentMutation(baseOptions?: Apollo.MutationHookOptions<StartExperimentMutation, StartExperimentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartExperimentMutation, StartExperimentMutationVariables>(StartExperimentDocument, options);
      }
export type StartExperimentMutationHookResult = ReturnType<typeof useStartExperimentMutation>;
export type StartExperimentMutationResult = Apollo.MutationResult<StartExperimentMutation>;
export type StartExperimentMutationOptions = Apollo.BaseMutationOptions<StartExperimentMutation, StartExperimentMutationVariables>;
export const UpdateFormDocument = gql`
    mutation updateForm($input: FormInput!, $date: String!) {
  updateForm(input: $input, date: $date) {
    form {
      ...FormData
    }
    errors {
      ...StarndardError
    }
  }
}
    ${FormDataFragmentDoc}
${StarndardErrorFragmentDoc}`;
export type UpdateFormMutationFn = Apollo.MutationFunction<UpdateFormMutation, UpdateFormMutationVariables>;

/**
 * __useUpdateFormMutation__
 *
 * To run a mutation, you first call `useUpdateFormMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFormMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFormMutation, { data, loading, error }] = useUpdateFormMutation({
 *   variables: {
 *      input: // value for 'input'
 *      date: // value for 'date'
 *   },
 * });
 */
export function useUpdateFormMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFormMutation, UpdateFormMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFormMutation, UpdateFormMutationVariables>(UpdateFormDocument, options);
      }
export type UpdateFormMutationHookResult = ReturnType<typeof useUpdateFormMutation>;
export type UpdateFormMutationResult = Apollo.MutationResult<UpdateFormMutation>;
export type UpdateFormMutationOptions = Apollo.BaseMutationOptions<UpdateFormMutation, UpdateFormMutationVariables>;
export const ClosedExperimentsDocument = gql`
    query ClosedExperiments {
  closedExperiments {
    id
    productName
    startDate
    endDate
    notes
    quantity
    isTolerable
  }
}
    `;

/**
 * __useClosedExperimentsQuery__
 *
 * To run a query within a React component, call `useClosedExperimentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useClosedExperimentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClosedExperimentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useClosedExperimentsQuery(baseOptions?: Apollo.QueryHookOptions<ClosedExperimentsQuery, ClosedExperimentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClosedExperimentsQuery, ClosedExperimentsQueryVariables>(ClosedExperimentsDocument, options);
      }
export function useClosedExperimentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClosedExperimentsQuery, ClosedExperimentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClosedExperimentsQuery, ClosedExperimentsQueryVariables>(ClosedExperimentsDocument, options);
        }
export type ClosedExperimentsQueryHookResult = ReturnType<typeof useClosedExperimentsQuery>;
export type ClosedExperimentsLazyQueryHookResult = ReturnType<typeof useClosedExperimentsLazyQuery>;
export type ClosedExperimentsQueryResult = Apollo.QueryResult<ClosedExperimentsQuery, ClosedExperimentsQueryVariables>;
export const DatesFromTimeRangeDocument = gql`
    query DatesFromTimeRange($before: String!, $after: String!) {
  formsFromTimeRange(before: $before, after: $after) {
    id
    createdAt
  }
}
    `;

/**
 * __useDatesFromTimeRangeQuery__
 *
 * To run a query within a React component, call `useDatesFromTimeRangeQuery` and pass it any options that fit your needs.
 * When your component renders, `useDatesFromTimeRangeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDatesFromTimeRangeQuery({
 *   variables: {
 *      before: // value for 'before'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useDatesFromTimeRangeQuery(baseOptions: Apollo.QueryHookOptions<DatesFromTimeRangeQuery, DatesFromTimeRangeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DatesFromTimeRangeQuery, DatesFromTimeRangeQueryVariables>(DatesFromTimeRangeDocument, options);
      }
export function useDatesFromTimeRangeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DatesFromTimeRangeQuery, DatesFromTimeRangeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DatesFromTimeRangeQuery, DatesFromTimeRangeQueryVariables>(DatesFromTimeRangeDocument, options);
        }
export type DatesFromTimeRangeQueryHookResult = ReturnType<typeof useDatesFromTimeRangeQuery>;
export type DatesFromTimeRangeLazyQueryHookResult = ReturnType<typeof useDatesFromTimeRangeLazyQuery>;
export type DatesFromTimeRangeQueryResult = Apollo.QueryResult<DatesFromTimeRangeQuery, DatesFromTimeRangeQueryVariables>;
export const DayFormDocument = gql`
    query DayForm($date: String!) {
  dayForm(date: $date) {
    ...FormData
  }
}
    ${FormDataFragmentDoc}`;

/**
 * __useDayFormQuery__
 *
 * To run a query within a React component, call `useDayFormQuery` and pass it any options that fit your needs.
 * When your component renders, `useDayFormQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDayFormQuery({
 *   variables: {
 *      date: // value for 'date'
 *   },
 * });
 */
export function useDayFormQuery(baseOptions: Apollo.QueryHookOptions<DayFormQuery, DayFormQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DayFormQuery, DayFormQueryVariables>(DayFormDocument, options);
      }
export function useDayFormLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DayFormQuery, DayFormQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DayFormQuery, DayFormQueryVariables>(DayFormDocument, options);
        }
export type DayFormQueryHookResult = ReturnType<typeof useDayFormQuery>;
export type DayFormLazyQueryHookResult = ReturnType<typeof useDayFormLazyQuery>;
export type DayFormQueryResult = Apollo.QueryResult<DayFormQuery, DayFormQueryVariables>;
export const ExperimentDocument = gql`
    query Experiment($id: Int!) {
  experiment(id: $id) {
    id
    productName
    startDate
  }
}
    `;

/**
 * __useExperimentQuery__
 *
 * To run a query within a React component, call `useExperimentQuery` and pass it any options that fit your needs.
 * When your component renders, `useExperimentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExperimentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useExperimentQuery(baseOptions: Apollo.QueryHookOptions<ExperimentQuery, ExperimentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExperimentQuery, ExperimentQueryVariables>(ExperimentDocument, options);
      }
export function useExperimentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExperimentQuery, ExperimentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExperimentQuery, ExperimentQueryVariables>(ExperimentDocument, options);
        }
export type ExperimentQueryHookResult = ReturnType<typeof useExperimentQuery>;
export type ExperimentLazyQueryHookResult = ReturnType<typeof useExperimentLazyQuery>;
export type ExperimentQueryResult = Apollo.QueryResult<ExperimentQuery, ExperimentQueryVariables>;
export const ExperimentFormsDocument = gql`
    query ExperimentForms($id: Int!) {
  experimentForms(id: $id) {
    createdAt
    productName
    quantity
    generalSensation
  }
}
    `;

/**
 * __useExperimentFormsQuery__
 *
 * To run a query within a React component, call `useExperimentFormsQuery` and pass it any options that fit your needs.
 * When your component renders, `useExperimentFormsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExperimentFormsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useExperimentFormsQuery(baseOptions: Apollo.QueryHookOptions<ExperimentFormsQuery, ExperimentFormsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExperimentFormsQuery, ExperimentFormsQueryVariables>(ExperimentFormsDocument, options);
      }
export function useExperimentFormsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExperimentFormsQuery, ExperimentFormsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExperimentFormsQuery, ExperimentFormsQueryVariables>(ExperimentFormsDocument, options);
        }
export type ExperimentFormsQueryHookResult = ReturnType<typeof useExperimentFormsQuery>;
export type ExperimentFormsLazyQueryHookResult = ReturnType<typeof useExperimentFormsLazyQuery>;
export type ExperimentFormsQueryResult = Apollo.QueryResult<ExperimentFormsQuery, ExperimentFormsQueryVariables>;
export const FormsFromTimeRangeDocument = gql`
    query FormsFromTimeRange($before: String!, $after: String!) {
  formsFromTimeRange(before: $before, after: $after) {
    ...FormData
  }
}
    ${FormDataFragmentDoc}`;

/**
 * __useFormsFromTimeRangeQuery__
 *
 * To run a query within a React component, call `useFormsFromTimeRangeQuery` and pass it any options that fit your needs.
 * When your component renders, `useFormsFromTimeRangeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFormsFromTimeRangeQuery({
 *   variables: {
 *      before: // value for 'before'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useFormsFromTimeRangeQuery(baseOptions: Apollo.QueryHookOptions<FormsFromTimeRangeQuery, FormsFromTimeRangeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FormsFromTimeRangeQuery, FormsFromTimeRangeQueryVariables>(FormsFromTimeRangeDocument, options);
      }
export function useFormsFromTimeRangeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FormsFromTimeRangeQuery, FormsFromTimeRangeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FormsFromTimeRangeQuery, FormsFromTimeRangeQueryVariables>(FormsFromTimeRangeDocument, options);
        }
export type FormsFromTimeRangeQueryHookResult = ReturnType<typeof useFormsFromTimeRangeQuery>;
export type FormsFromTimeRangeLazyQueryHookResult = ReturnType<typeof useFormsFromTimeRangeLazyQuery>;
export type FormsFromTimeRangeQueryResult = Apollo.QueryResult<FormsFromTimeRangeQuery, FormsFromTimeRangeQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...StandardUser
  }
}
    ${StandardUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const OpenExperimentsDocument = gql`
    query OpenExperiments {
  openExperiments {
    id
    productName
    startDate
  }
}
    `;

/**
 * __useOpenExperimentsQuery__
 *
 * To run a query within a React component, call `useOpenExperimentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpenExperimentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpenExperimentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useOpenExperimentsQuery(baseOptions?: Apollo.QueryHookOptions<OpenExperimentsQuery, OpenExperimentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OpenExperimentsQuery, OpenExperimentsQueryVariables>(OpenExperimentsDocument, options);
      }
export function useOpenExperimentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OpenExperimentsQuery, OpenExperimentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OpenExperimentsQuery, OpenExperimentsQueryVariables>(OpenExperimentsDocument, options);
        }
export type OpenExperimentsQueryHookResult = ReturnType<typeof useOpenExperimentsQuery>;
export type OpenExperimentsLazyQueryHookResult = ReturnType<typeof useOpenExperimentsLazyQuery>;
export type OpenExperimentsQueryResult = Apollo.QueryResult<OpenExperimentsQuery, OpenExperimentsQueryVariables>;