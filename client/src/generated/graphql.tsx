import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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

export type FieldError = {
  __typename?: 'FieldError';
  fieldName: Scalars['String'];
  message: Scalars['String'];
};

export type Form = {
  __typename?: 'Form';
  activities?: Maybe<Array<Activity>>;
  createdAt: Scalars['String'];
  creatorId: Scalars['Float'];
  dayRate: Scalars['Float'];
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

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  createForm: Form;
  forgotPassword: ActionResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  updateForm: Form;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateFormArgs = {
  input: FormInput;
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


export type MutationUpdateFormArgs = {
  id: Scalars['Int'];
  input: FormInput;
};

export type Query = {
  __typename?: 'Query';
  dayForm?: Maybe<Form>;
  formsFromTimeRange?: Maybe<Array<Form>>;
  me?: Maybe<User>;
  test: Scalars['String'];
};


export type QueryDayFormArgs = {
  date: Scalars['String'];
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

export type FormDataFragment = { __typename?: 'Form', id: number, createdAt: string, dayRate: number, weight: number, stoolTypes: Array<number>, sleepLenght: number, sleepQuality: number, mood: number, stressLevel: number, inTherapy: boolean, menstruation?: Maybe<boolean>, migraine: boolean, pollakiuria: boolean, notes?: Maybe<string>, symptoms?: Maybe<Array<{ __typename?: 'Symptom', id: number, name: string, intensity: number, isDangerous?: Maybe<boolean> }>>, activities?: Maybe<Array<{ __typename?: 'Activity', id: number, type: string, moodAfter: number, time: number }>> };

export type FormInputFragment = { __typename?: 'Form', id: number, createdAt: string, dayRate: number, weight: number, stoolTypes: Array<number>, sleepLenght: number, sleepQuality: number, mood: number, stressLevel: number, inTherapy: boolean, menstruation?: Maybe<boolean>, migraine: boolean, pollakiuria: boolean, notes?: Maybe<string>, symptoms?: Maybe<Array<{ __typename?: 'Symptom', name: string, intensity: number, isDangerous?: Maybe<boolean> }>>, activities?: Maybe<Array<{ __typename?: 'Activity', type: string, moodAfter: number, time: number }>> };

export type StarndardErrorFragment = { __typename?: 'FieldError', fieldName: string, message: string };

export type StandardUserFragment = { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, gender: string };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', fieldName: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, firstName: string, lastName: string, email: string, gender: string }> } };

export type CreateFormMutationVariables = Exact<{
  input: FormInput;
}>;


export type CreateFormMutation = { __typename?: 'Mutation', createForm: { __typename?: 'Form', id: number, createdAt: string, dayRate: number, weight: number, stoolTypes: Array<number>, sleepLenght: number, sleepQuality: number, mood: number, stressLevel: number, inTherapy: boolean, menstruation?: Maybe<boolean>, migraine: boolean, pollakiuria: boolean, notes?: Maybe<string>, symptoms?: Maybe<Array<{ __typename?: 'Symptom', id: number, name: string, intensity: number, isDangerous?: Maybe<boolean> }>>, activities?: Maybe<Array<{ __typename?: 'Activity', id: number, type: string, moodAfter: number, time: number }>> } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'ActionResponse', success?: Maybe<boolean>, errors?: Maybe<Array<{ __typename?: 'FieldError', fieldName: string, message: string }>> } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', fieldName: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, firstName: string, lastName: string, email: string, gender: string }> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  gender: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', user?: Maybe<{ __typename?: 'User', id: number, firstName: string, lastName: string, email: string, gender: string }>, errors?: Maybe<Array<{ __typename?: 'FieldError', fieldName: string, message: string }>> } };

export type UpdateFormMutationVariables = Exact<{
  input: FormInput;
  id: Scalars['Int'];
}>;


export type UpdateFormMutation = { __typename?: 'Mutation', updateForm: { __typename?: 'Form', id: number, createdAt: string, dayRate: number, weight: number, stoolTypes: Array<number>, sleepLenght: number, sleepQuality: number, mood: number, stressLevel: number, inTherapy: boolean, menstruation?: Maybe<boolean>, migraine: boolean, pollakiuria: boolean, notes?: Maybe<string>, symptoms?: Maybe<Array<{ __typename?: 'Symptom', id: number, name: string, intensity: number, isDangerous?: Maybe<boolean> }>>, activities?: Maybe<Array<{ __typename?: 'Activity', id: number, type: string, moodAfter: number, time: number }>> } };

export type DatesFromTimeRangeQueryVariables = Exact<{
  before: Scalars['String'];
  after: Scalars['String'];
}>;


export type DatesFromTimeRangeQuery = { __typename?: 'Query', formsFromTimeRange?: Maybe<Array<{ __typename?: 'Form', id: number, createdAt: string }>> };

export type DayFormQueryVariables = Exact<{
  date: Scalars['String'];
}>;


export type DayFormQuery = { __typename?: 'Query', dayForm?: Maybe<{ __typename?: 'Form', id: number, createdAt: string, dayRate: number, weight: number, stoolTypes: Array<number>, sleepLenght: number, sleepQuality: number, mood: number, stressLevel: number, inTherapy: boolean, menstruation?: Maybe<boolean>, migraine: boolean, pollakiuria: boolean, notes?: Maybe<string>, symptoms?: Maybe<Array<{ __typename?: 'Symptom', id: number, name: string, intensity: number, isDangerous?: Maybe<boolean> }>>, activities?: Maybe<Array<{ __typename?: 'Activity', id: number, type: string, moodAfter: number, time: number }>> }> };

export type FormsFromTimeRangeQueryVariables = Exact<{
  before: Scalars['String'];
  after: Scalars['String'];
}>;


export type FormsFromTimeRangeQuery = { __typename?: 'Query', formsFromTimeRange?: Maybe<Array<{ __typename?: 'Form', id: number, createdAt: string, dayRate: number, weight: number, stoolTypes: Array<number>, sleepLenght: number, sleepQuality: number, mood: number, stressLevel: number, inTherapy: boolean, menstruation?: Maybe<boolean>, migraine: boolean, pollakiuria: boolean, notes?: Maybe<string>, symptoms?: Maybe<Array<{ __typename?: 'Symptom', id: number, name: string, intensity: number, isDangerous?: Maybe<boolean> }>>, activities?: Maybe<Array<{ __typename?: 'Activity', id: number, type: string, moodAfter: number, time: number }>> }>> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: number, firstName: string, lastName: string, email: string, gender: string }> };

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

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreateFormDocument = gql`
    mutation createForm($input: FormInput!) {
  createForm(input: $input) {
    ...FormData
  }
}
    ${FormDataFragmentDoc}`;

export function useCreateFormMutation() {
  return Urql.useMutation<CreateFormMutation, CreateFormMutationVariables>(CreateFormDocument);
};
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

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
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

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
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

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UpdateFormDocument = gql`
    mutation updateForm($input: FormInput!, $id: Int!) {
  updateForm(input: $input, id: $id) {
    ...FormData
  }
}
    ${FormDataFragmentDoc}`;

export function useUpdateFormMutation() {
  return Urql.useMutation<UpdateFormMutation, UpdateFormMutationVariables>(UpdateFormDocument);
};
export const DatesFromTimeRangeDocument = gql`
    query DatesFromTimeRange($before: String!, $after: String!) {
  formsFromTimeRange(before: $before, after: $after) {
    id
    createdAt
  }
}
    `;

export function useDatesFromTimeRangeQuery(options: Omit<Urql.UseQueryArgs<DatesFromTimeRangeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<DatesFromTimeRangeQuery>({ query: DatesFromTimeRangeDocument, ...options });
};
export const DayFormDocument = gql`
    query dayForm($date: String!) {
  dayForm(date: $date) {
    ...FormData
  }
}
    ${FormDataFragmentDoc}`;

export function useDayFormQuery(options: Omit<Urql.UseQueryArgs<DayFormQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<DayFormQuery>({ query: DayFormDocument, ...options });
};
export const FormsFromTimeRangeDocument = gql`
    query FormsFromTimeRange($before: String!, $after: String!) {
  formsFromTimeRange(before: $before, after: $after) {
    ...FormData
  }
}
    ${FormDataFragmentDoc}`;

export function useFormsFromTimeRangeQuery(options: Omit<Urql.UseQueryArgs<FormsFromTimeRangeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FormsFromTimeRangeQuery>({ query: FormsFromTimeRangeDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...StandardUser
  }
}
    ${StandardUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};