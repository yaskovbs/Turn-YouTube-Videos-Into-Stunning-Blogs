
import fs from 'fs';
import path from 'path';

// In-memory storage with file persistence
interface Blog {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

// File-based database implementation that mimics Kysely interface
class FileDB {
  private blogs: Blog[] = [];
  private blogsPath: string;
  private nextId = 1;

  constructor() {
    this.blogsPath = path.join(process.cwd(), 'data', 'blogs.json');
    this.loadBlogs();
  }

  private loadBlogs() {
    try {
      if (fs.existsSync(this.blogsPath)) {
        const data = fs.readFileSync(this.blogsPath, 'utf8');
        const parsed = JSON.parse(data);
        this.blogs = parsed.blogs || [];
        this.nextId = parsed.nextId || 1;
      } else {
        // Ensure data directory exists
        const dataDir = path.dirname(this.blogsPath);
        if (!fs.existsSync(dataDir)) {
          fs.mkdirSync(dataDir, { recursive: true });
        }
        this.saveBlogs();
      }
    } catch (error) {
      console.log('Initializing new blogs database');
      this.nextId = 1;
    }
  }

  private saveBlogs() {
    const dataDir = path.dirname(this.blogsPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(this.blogsPath, JSON.stringify({
      blogs: this.blogs,
      nextId: this.nextId
    }, null, 2));
  }

  // Kysely-compatible API
  selectFrom(table: string) {
    if (table !== 'blogs') {
      throw new Error(`Table ${table} not found`);
    }

    return {
      selectAll: () => ({
        orderBy: (column: string, direction: 'asc' | 'desc' = 'asc') => ({
          execute: (): Promise<Blog[]> => {
            const sorted = [...this.blogs].sort((a, b) => {
              const aVal = a[column as keyof Blog];
              const bVal = b[column as keyof Blog];

              if (direction === 'desc') {
                return typeof aVal === 'string' && typeof bVal === 'string'
                  ? bVal.localeCompare(aVal)
                  : (bVal as any) - (aVal as any);
              }
              return typeof aVal === 'string' && typeof bVal === 'string'
                ? aVal.localeCompare(bVal)
                : (aVal as any) - (bVal as any);
            });
            return Promise.resolve(sorted);
          }
        })
      })
    };
  }

  insertInto(table: string) {
    if (table !== 'blogs') {
      throw new Error(`Table ${table} not found`);
    }

    return {
      values: (values: { title: string; content: string }) => ({
        returningAll: () => ({
          executeTakeFirstOrThrow: (): Promise<Blog> => {
            const newBlog: Blog = {
              id: this.nextId++,
              title: values.title,
              content: values.content,
              created_at: new Date().toISOString()
            };
            this.blogs.push(newBlog);
            this.saveBlogs();
            return Promise.resolve(newBlog);
          }
        })
      })
    };
  }
}

export const db = new FileDB();
