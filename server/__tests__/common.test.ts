import { Connection } from "typeorm";
import { createConn } from "../src/createTestConnection";
import { experimentTest } from "./resolversTests/experimentTest";
import { formTest } from "./resolversTests/formTest";
import { userTest } from "./resolversTests/userTest";

let conn: Connection;

beforeAll(async () => {
  conn = await createConn();
});

afterAll(async () => {
  await conn.close();
});

userTest();
experimentTest();
formTest();
