import path from "path";
import { createConnection } from "typeorm";
import { User } from "./entities/user";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { TestResover } from "./resolvers/test";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [User],
  });

  const app = express();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TestResover],
      validate: false,
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log("server started: localhost:4000");
  });
};

main().catch((err) => {
  console.error(err);
});
