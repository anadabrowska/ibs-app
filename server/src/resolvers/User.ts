import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";
import { v4 } from "uuid";
import { User } from "../entities/User";
import { Context } from "src/types";
import { COOKIE_NAME, FORGOT_PASSWORD_KEY_PREFIX } from "../constants";
import { sendEmail } from "../utils/sendEmail";

@InputType()
class RegisterInput {
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  email: string;
  @Field()
  password: string;
}

@InputType()
class LoginInput {
  @Field()
  email: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  fieldName: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
class ActionResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => Boolean, { nullable: true })
  success?: Boolean;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: Context) {
    if (!req.session.userId) {
      return null;
    }
    const user = await User.findOne({ id: req.session.userId });
    return user;
  }

  @Mutation(() => UserResponse)
  async register(@Arg("input") input: RegisterInput): Promise<UserResponse> {
    const hashedPassword = await argon2.hash(input.password);

    //TODO: add MUCH better validation

    if (input.email.length <= 2) {
      return {
        errors: [
          {
            fieldName: "email",
            message: "Invalid email",
          },
        ],
      };
    }
    if (input.password.length <= 2) {
      return {
        errors: [
          {
            fieldName: "password",
            message: "Passowrd does not fulfill all requirements",
          },
        ],
      };
    }
    const user = await User.create({
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      password: hashedPassword,
    }).save();

    return {
      user,
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("input") input: LoginInput,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { email: input.email } });

    if (!user) {
      return {
        errors: [
          {
            fieldName: "email",
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
            message: "Password is invalid",
          },
        ],
      };
    }

    req.session.userId = user.id;

    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: Context) {
    return new Promise((resolve) =>
      req.session.destroy((error) => {
        res.clearCookie(COOKIE_NAME);
        if (error) {
          console.log(error);
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }

  @Mutation(() => ActionResponse)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: Context
  ): Promise<ActionResponse> {
    //TODO: add MUCH better validation

    if (email.length <= 2) {
      return {
        errors: [
          {
            fieldName: "email",
            message: "Invalid email",
          },
        ],
      };
    }

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return {
        errors: [
          {
            fieldName: "email",
            message: "User with this email doesn't exist",
          },
        ],
      };
    }

    const token = v4();

    //token expores after a day
    await redis.set(
      FORGOT_PASSWORD_KEY_PREFIX + token,
      user.id,
      "ex",
      1000 * 60 * 60 * 24 * 1
    );

    await sendEmail(
      email,
      "forgot password",
      `<a href="http://localhost:3000/change-password/${token}">reset password</a>`
    );
    return { success: true };
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { redis }: Context
  ): Promise<UserResponse> {
    //TODO: add MUCH better validation
    //create generic validation functions for things like password or email

    if (newPassword.length <= 2) {
      return {
        errors: [
          {
            fieldName: "newPassword",
            message: "Passowrd does not fulfill all requirements",
          },
        ],
      };
    }
    const key = FORGOT_PASSWORD_KEY_PREFIX + token;
    const userId = await redis.get(key);

    if (!userId) {
      return {
        errors: [
          {
            fieldName: "token",
            message: "Your token expired, request password change again",
          },
        ],
      };
    }

    const parsedUserId = parseInt(userId);
    const user = await User.findOne({ where: { id: parsedUserId } });

    if (!user) {
      return {
        errors: [
          {
            fieldName: "token",
            message: "This user no longer exist",
          },
        ],
      };
    }

    await User.update(
      { id: parsedUserId },
      {
        password: await argon2.hash(newPassword),
      }
    );

    await redis.del(key);

    return { user };
  }
}
