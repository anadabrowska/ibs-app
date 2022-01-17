import { graphql } from "graphql";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/User";
import { ExperimentResover } from "./resolvers/experiment";
import { FormResolver } from "./resolvers/form";

export const testGraphQLCall = async (
  query: any,
  variables?: any,
  userId?: number | string
) => {
  return graphql(
    await buildSchema({
      resolvers: [UserResolver, FormResolver, ExperimentResover],
      validate: false,
    }),
    query,
    undefined,
    {
      req: {
        session: {
          userId,
        },
      },
      res: {
        clearCookie: () => {},
      },
    },
    variables
  );
};
