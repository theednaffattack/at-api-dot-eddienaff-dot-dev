import pg from "pg";
export default new pg.Pool({
  connectionString: "postgres://localhost/atlas_travel",
}); // process.env.DATABASE_URL });
