
import { Generated } from 'kysely';

export interface BlogsTable {
  id: Generated<number>;
  title: string;
  content: string;
  created_at: Generated<string>;
}

export interface DatabaseSchema {
  blogs: BlogsTable;
}
