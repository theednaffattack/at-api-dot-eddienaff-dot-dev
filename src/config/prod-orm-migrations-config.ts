import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const isLoggingTrue = process.env.TYPEORM_LOGGING === "true";
// const isSynchronizeTrue = process.env.TYPEORM_SYNCHRONIZE === "true";
// const isSynchronizeTrue = "true" === "true";
const productionOrmMigrationsConfig: PostgresConnectionOptions = {
  // name: "default",
  type: "postgres",
  host: process.env.ATAPI_VIRTUAL_HOST, // process.env.AT_DB_HOST,
  port: process.env.AT_DB_PORT ? parseInt(process.env.AT_DB_PORT) : 5432,
  ssl: true,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASS,
  database: process.env.POSTGRES_DBNAME,
  logging: isLoggingTrue,
  synchronize: false,
  entities: [
    "src/entity/*.*", // "dist/entity/*.*",
  ],
  migrations: [
    "src/migration/**/*.ts", // "dist/migration/**/*.js", //
  ],
  subscribers: [
    "dist/subscriber/**/*.ts", // "src/subscriber/**/*.ts"
  ],
  cli: {
    migrationsDir: "src/migration",
  },
};

export = productionOrmMigrationsConfig;
