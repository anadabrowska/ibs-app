import { FieldError } from "../generated/graphql";

export const mapErrors = (errors: FieldError[]) => {
  const errorMap: { [key: string]: string } = {};

  errors.forEach(({ fieldName, message }) => {
    errorMap[fieldName] = message;
  });

  return errorMap;
};
