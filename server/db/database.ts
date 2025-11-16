// Temporary mock database until better-sqlite3 can be installed
// This allows the server to start without requiring native compilation

interface DatabaseSchema {
  users: {
    id: number;
    username: string | null;
    gemini_api_key: string | null;
    created_at: string;
  };
  blogs: {
    id: number;
    title: string;
    content: string;
    user_id: number | null;
    is_public: boolean;
    created_at: string;
    youtube_url: string | null;
  };
  custom_domains: {
    id: number;
    user_id: number;
    domain: string;
    created_at: string;
  };
}

// Mock database implementation
class MockDatabase {
  private data: Map<string, any[]> = new Map();

  constructor() {
    // Initialize empty tables
    this.data.set('users', []);
    this.data.set('blogs', []);
    this.data.set('custom_domains', []);
    console.log('Mock database initialized - using in-memory storage');
  }

  selectFrom(table: string) {
    return {
      selectAll: () => ({
        where: (column: string, op: string, value: any) => ({
          executeTakeFirst: () => {
            const tableData = this.data.get(table) || [];
            const results = tableData.filter(row => {
              if (op === '=') return row[column] === value;
              if (op === '!=') return row[column] !== value;
              return false;
            });
            return results.length > 0 ? results[0] : null;
          },
          execute: () => {
            const tableData = this.data.get(table) || [];
            return tableData.filter(row => {
              if (op === '=') return row[column] === value;
              if (op === '!=') return row[column] !== value;
              return false;
            });
          }
        }),
        execute: () => this.data.get(table) || []
      }),
      where: (column: string, op: string, value: any) => ({
        selectAll: () => ({
          orderBy: (orderColumn: string, direction: string) => ({
            execute: () => {
              const tableData = this.data.get(table) || [];
              let results = tableData.filter(row => {
                if (op === '=') {
                  if (typeof value === 'number' && typeof row[column] === 'string') {
                    return parseInt(row[column]) === value;
                  }
                  return row[column] === value;
                }
                return false;
              });
              if (direction === 'desc') {
                results.sort((a, b) => (b[orderColumn] || '').localeCompare(a[orderColumn] || ''));
              }
              return results;
            }
          })
        })
      })
    };
  }

  insertInto(table: string) {
    return {
      values: (data: any) => ({
        returningAll: () => ({
          executeTakeFirstOrThrow: () => {
            const tableData = this.data.get(table) || [];
            const newId = tableData.length + 1;
            const newRecord = { ...data, id: newId, created_at: new Date().toISOString() };
            tableData.push(newRecord);
            return newRecord;
          }
        })
      })
    };
  }

  updateTable(table: string) {
    return {
      set: (updates: any) => ({
        where: (column: string, op: string, value: any) => ({
          execute: () => {
            const tableData = this.data.get(table) || [];
            const index = tableData.findIndex(row => {
              if (op === '=') return row[column] === value;
              return false;
            });
            if (index !== -1) {
              tableData[index] = { ...tableData[index], ...updates };
            }
          }
        })
      })
    };
  }

  schema = {
    dropTable: (table: string) => ({
      ifExists: () => ({
        execute: () => {
          this.data.set(table, []);
        }
      })
    }),
    createTable: (table: string) => ({
      addColumn: (col: string, type: string, options?: any) => ({
        primaryKey: () => ({
          autoIncrement: () => ({
            execute: () => console.log(`Created table ${table}`)
          })
        }),
        execute: () => console.log(`Created table ${table}`)
      })
    })
  }
}

export const db = new MockDatabase() as any;
