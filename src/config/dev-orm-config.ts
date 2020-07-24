import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export const devOrmconfig: PostgresConnectionOptions = {
  name: "default",
  type: "postgres",
  host: "localhost",
  port: process.env.AT_DB_PORT ? parseInt(process.env.AT_DB_PORT) : 5432,
  ssl: false,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASS,
  database: process.env.POSTGRES_DBNAME,
  logging: true,
  synchronize: true,
  // entities: [`${__dirname}/entity/*.ts`],
  entities: [`src/entity/*{.ts,.js}`],
  migrations: [`src/migration/**/*.ts`],
  subscribers: [`src/subscriber/**/*.ts`],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};

// module.exports = devOrmconfig;
