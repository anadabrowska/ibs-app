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
import { User } from "../entities/User";
import { Context } from "src/types";
import { COOKIE_NAME } from "../constants";

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

@Resolver()
export class UserResover {
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
}
