import * as db from "./zapatos/src";
import * as s from "./zapatos/schema";
import pool from "./zapatos/pg-pool";

async function testPg() {
  const hotels = await db.sql<s.hotel.SQL, s.hotel.Selectable[]>`
SELECT * FROM ${"hotel"}`.run(pool);

  console.log("VIEW ALL HOTELS", hotels);
}

testPg();
