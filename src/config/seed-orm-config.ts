// import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

// export const seedOrmconfig: PostgresConnectionOptions = {
//   name: "default",
//   type: "postgres",
//   host: "localhost",
//   port: process.env.AT_DB_PORT ? parseInt(process.env.AT_DB_PORT) : 5432,
//   ssl: false,
//   username: process.env.POSTGRES_USER,
//   password: process.env.POSTGRES_PASSWORD,
//   database: process.env.POSTGRES_DB,
//   logging: true,
//   synchronize: true,
//   entities: ["src/entity/*.ts"],
//   migrations: [`src/migration/**/*.ts`],
//   subscribers: [`src/subscriber/**/*.ts`],
//   cli: {
//     entitiesDir: "src/entity",
//     migrationsDir: "src/migration",
//     subscribersDir: "src/subscriber",
//   },
// };

export = {
  name: "default",
  type: "postgres",
  host: "localhost",
  port: process.env.AT_DB_PORT ? parseInt(process.env.AT_DB_PORT) : 5432,
  ssl: false,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  logging: false,
  synchronize: true,
  entities: ["src/entity/*.ts"],
  migrations: [`src/migration/**/*.ts`],
  subscribers: [`src/subscriber/**/*.ts`],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};
