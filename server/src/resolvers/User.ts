import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import argon2 from "argon2";
import { v4 } from "uuid";
import { Gender, User } from "../entities/User";
import { Context } from "src/types";
import { COOKIE_NAME, FORGOT_PASSWORD_KEY_PREFIX } from "../constants";
import { sendEmail } from "../utils/sendEmail";
import { isAuth } from "../middleware/isAuth";
import {
  validateEmail,
  validateLoginData,
  validateRegisterData,
  validatePassword,
} from "../utils/userValidation";

@InputType()
export class RegisterInput {
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  gender: Gender;
  @Field()
  email: string;
  @Field()
  password: string;
}

@InputType()
export class LoginInput {
  @Field()
  email: string;
  @Field()
  password: string;
}

@ObjectType()
export class FieldError {
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
  @UseMiddleware(isAuth)
  async me(@Ctx() { req }: Context) {
    if (!(req.session as any).userId) {
      return null;
    }
    const user = await User.findOne({ id: (req.session as any).userId });
    return user;
  }

  @Mutation(() => UserResponse)
  async register(@Arg("input") input: RegisterInput): Promise<UserResponse> {
    const hashedPassword = await argon2.hash(input.password);

    const errors = validateRegisterData(input);
    if (errors) {
      return errors;
    }

    const user = await User.create({
      firstName: input.firstName,
      lastName: input.lastName,
      gender: input.gender,
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

    const errors = await validateLoginData(input, user);
    if (errors) {
      return errors;
    }

    (req.session as any).userId = user?.id;

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
    const emailValidation = validateEmail(email);
    if (emailValidation) return emailValidation;

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

    //token expires after a day
    await redis.set(
      FORGOT_PASSWORD_KEY_PREFIX + token,
      user.id,
      "ex",
      1000 * 60 * 60 * 24 * 1
    );

    await sendEmail(
      email,
      "forgot password",
      `<a href="${process.env.FRONTEND_URL}/change-password/${token}">reset password</a>`
    );
    return { success: true };
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { redis }: Context
  ): Promise<UserResponse> {
    const passwordValidation = validatePassword(newPassword);
    if (passwordValidation) return passwordValidation;
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
