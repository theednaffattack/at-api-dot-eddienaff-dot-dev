import { createConnection, Connection } from "typeorm";

import { testOrmconfig } from "../config/test-orm-config";

export const testConn = (drop = false): Promise<Connection> => {
  return createConnection(testOrmconfig({ drop }));

  // return createConnection({
  //   name: "default",
  //   type: "postgres",
  //   host: "localhost",
  //   port: 5432,
  //   username: process.env.POSTGRES_USER, // superuser
  //   password: process.env.POSTGRES_PASSWORD,
  //   database: process.env.POSTGRES_TEST_DB,
  //   dropSchema: drop,
  //   synchronize: true,
  //   entities: [__dirname + "/../entity/*.*"],
  // });
};
