import "reflect-metadata";
import path from "path";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { TestResover } from "./resolvers/test";
import { UserResover } from "./resolvers/user";
import { User } from "./entities/User";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import { __prod__ } from "./constants";
import { Context } from "./types";

declare module "express-session" {
  export interface SessionData {
    userId: number;
  }
}

const main = async () => {
  await createConnection({
    type: "postgres",
    database: "ibs-app",
    username: "postgres",
    password: "postgres",
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [User],
  });

  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  app.use(
    session({
      name: "session-id",
      store: new RedisStore({
        client: redisClient,
        //TODO: think of session length, now it's forever
        disableTouch: true,
      }),
      cookie: {
        //year
        maxAge: 1000 * 60 * 60 * 24 * 365,
        httpOnly: true,
        //TODO: make prod https
        secure: __prod__,
      },
      saveUninitialized: false,
      //TODO:  make this Env variable
      secret: "sjbjkbjsdnij8y97843y7",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TestResover, UserResover],
      validate: false,
    }),
    context: ({ req, res }): Context => ({ req, res }),
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
