
import { Kysely, SqliteDialect } from 'kysely';
import Database from 'better-sqlite3';
import { DatabaseSchema } from './schema';
import path from 'path';

const dbPath = process.env.DATA_DIRECTORY
  ? path.join(process.env.DATA_DIRECTORY, 'database.sqlite')
  : path.join(process.cwd(), 'data', 'database.sqlite');

const sqliteDb = new Database(dbPath);

export const db = new Kysely<DatabaseSchema>({
  dialect: new SqliteDialect({
    database: sqliteDb,
  }),
  log: ['query', 'error'],
});
