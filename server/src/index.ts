import "reflect-metadata";
import path from "path";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { TestResover } from "./resolvers/test";
import { UserResolver } from "./resolvers/user";
import { User } from "./entities/User";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import { COOKIE_NAME, __prod__ } from "./constants";
import { Context } from "./types";
import cors from "cors";
import { FormResover } from "./resolvers/form";
import { Form } from "./entities/form";
import { Activity } from "./entities/activity";
import { Symptom } from "./entities/symptom";

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
    entities: [User, Form, Symptom, Activity],
  });

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis as any,
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
      resolvers: [TestResover, UserResolver, FormResover],
      validate: false,
    }),
    context: ({ req, res }): Context => ({ req, res, redis }),
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
