import { User } from "src/entities/User";
import { LoginInput, RegisterInput } from "src/resolvers/User";
import argon2 from "argon2";

export const validateEmail = (email: string) => {
  if (email.length <= 2) {
    return {
      errors: [
        {
          fieldName: "email",
          errorId: "UserError.email.invalid",
          message: "Invalid email",
        },
      ],
    };
  }
  return null;
};

export const validatePassword = (password: string) => {
  if (password.length <= 2) {
    return {
      errors: [
        {
          fieldName: "password",
          errorId: "UserError.password.not-fulfill-requirements",
          message: "Passowrd does not fulfill all requirements",
        },
      ],
    };
  }
  return null;
};

export const validateRegisterData = (input: RegisterInput) => {
  if (input.gender.length === 0) {
    return {
      errors: [
        {
          fieldName: "gender",
          errorId: "UserError.gender.empty",
          message: "This field can't be empty",
        },
      ],
    };
  }
  const emailValidation = validateEmail(input.email);
  if (emailValidation) return emailValidation;
  const passwordValidation = validatePassword(input.password);
  if (passwordValidation) return passwordValidation;
  return null;
};

export const validateLoginData = async (
  input: LoginInput,
  user: User | undefined
) => {
  const emailValidation = validateEmail(input.email);
  if (emailValidation) return emailValidation;
  if (!user) {
    return {
      errors: [
        {
          fieldName: "email",
          errorId: "UserError.email.no-user",
          message: "User with this email doesn't exist",
        },
      ],
    };
  }

  const isValid = await argon2.verify(user.password, input.password);

  if (!isValid) {
    return {
      errors: [
        {
          fieldName: "password",
          errorId: "UserError.password.invalid",
          message: "Password is invalid",
        },
      ],
    };
  }
  return null;
};
