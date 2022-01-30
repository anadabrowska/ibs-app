import { IntlShape } from "react-intl";
import { FieldError } from "../generated/graphql";

export const mapErrors = (errors: FieldError[], intl: IntlShape) => {
  const errorMap: { [key: string]: string } = {};

  errors.forEach(({ fieldName, errorId, message }) => {
    errorMap[fieldName] = intl.formatMessage({
      id: errorId,
      defaultMessage: message,
    });
  });

  return errorMap;
};
