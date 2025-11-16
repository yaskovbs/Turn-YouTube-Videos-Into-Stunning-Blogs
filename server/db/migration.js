
import { db } from './database.js';
import { sql } from 'kysely';

async function migrate() {
  try {
    // Drop the existing users table if it exists
    await db.schema.dropTable('users').ifExists().execute();

    // Create the users table with the new schema
    await db.schema
      .createTable('users')
      .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
      .addColumn('username', 'text')
      .addColumn('gemini_api_key', 'text')
      .addColumn('google_id', 'text', (col) => col.unique())
      .addColumn('display_name', 'text')
      .addColumn('email', 'text', (col) => col.unique())
      .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`))
      .execute();

    console.log('Database migration successful!');
  } catch (error) {
    console.error('Error during database migration:', error);
    process.exit(1); // Exit with error
  }
}

migrate();
