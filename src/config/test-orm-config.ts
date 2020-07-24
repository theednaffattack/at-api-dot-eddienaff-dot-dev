import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

interface TestOrmConfigProps {
  drop: boolean;
}

export const testOrmconfig = ({
  drop,
}: TestOrmConfigProps): PostgresConnectionOptions => {
  return {
    // name: "test",
    type: "postgres",
    host: "localhost",
    port: process.env.AT_DB_PORT ? parseInt(process.env.AT_DB_PORT) : 5432,
    ssl: false,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_TEST_DB,
    dropSchema: drop,
    logging: false,
    synchronize: true,
    entities: [`src/entity/**/*.*`],
    migrations: [`src/migration/**/*.ts`],
    subscribers: [`src/subscriber/**/*.ts`],
    cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber",
    },
  };
};
