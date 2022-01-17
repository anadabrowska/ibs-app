import path from "path";
import { createConnection } from "typeorm";
import { Activity } from "./entities/activity";
import { Experiment } from "./entities/experiment";
import { ExperimentForm } from "./entities/experimentForm";
import { Form } from "./entities/form";
import { Symptom } from "./entities/symptom";
import { User } from "./entities/User";

export const createConn = async () =>
  createConnection({
    type: "postgres",
    url: "postgres://postgres:postgres@localhost:5432/ibs-app-test",
    dropSchema: true,
    logging: false,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [User, Form, Symptom, Activity, Experiment, ExperimentForm],
  });
