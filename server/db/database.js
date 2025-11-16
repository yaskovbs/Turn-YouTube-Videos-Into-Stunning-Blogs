import Database from "better-sqlite3";
import { Kysely, SqliteDialect } from "kysely";

const dialect = new SqliteDialect({
  database: new Database("../db.sqlite"),
});

export const db = new Kysely({
  dialect,
});
