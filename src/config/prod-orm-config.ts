import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const isLoggingTrue = process.env.TYPEORM_LOGGING === "true";
// const isSynchronizeTrue = process.env.TYPEORM_SYNCHRONIZE === "true";
// const isSynchronizeTrue = "true" === "true";
const productionOrmConfig: PostgresConnectionOptions = {
  // name: "default",
  type: "postgres",
  host: "at-db", // process.env.AT_DB_HOST,
  port: process.env.AT_DB_PORT ? parseInt(process.env.AT_DB_PORT) : 5432,
  ssl: true,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASS,
  database: process.env.POSTGRES_DBNAME,

  logging: isLoggingTrue,
  synchronize: false,
  entities: [
    process.env.BUILD_FLAG === "local" ? "src/entity/*.*" : "dist/entity/*.*",
  ],
  migrations: [
    process.env.BUILD_FLAG === "local"
      ? "src/migration/**/*.ts"
      : "dist/migration/**/*.js",
  ],
  subscribers: [
    process.env.BUILD_FLAG === "local"
      ? "src/subscriber/**/*.ts"
      : "dist/subscriber/**/*.js",
  ],
  cli: {
    migrationsDir: "src/migration/**/*.js",
  },
};

export = productionOrmConfig;
