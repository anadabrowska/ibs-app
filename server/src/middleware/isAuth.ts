import { Context } from "src/types";
import { MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
  if (!(context.req.session as any).userId) {
    throw new Error("not authenticated");
  }

  return next();
};
