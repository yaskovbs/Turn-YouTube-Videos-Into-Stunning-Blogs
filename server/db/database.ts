
import { Kysely, SqliteDialect } from 'kysely';
import BetterSqlite3 from 'better-sqlite3';

// This is a mock database that uses a file-based JSON store to be compatible with Kysely.
// This is not a complete implementation of a Kysely dialect, but it is enough to run the app.
const dialect = new SqliteDialect({
  database: new BetterSqlite3('./db.sqlite'),
});

export const db = new Kysely<any>({
  dialect,
});
