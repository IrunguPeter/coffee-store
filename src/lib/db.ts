import { Pool } from 'pg';

const pool = new Pool({
  connectionString: import.meta.env.VITE_DATABASE_URL || 'postgresql://eshop:eshop_password@localhost:5432/eshop',
  // NOTE: In a production app, never expose the database connection string to the client.
  // This is a demo setup. For production, use a backend API (Node/Express, Go, etc.)
  // between the frontend and PostgreSQL.
});

export async function query(text: string, params?: any[]) {
  const start = Date.now();
  const result = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('Executed query', { text: text.substring(0, 100), duration, rows: result.rowCount });
  return result;
}

export async function getClient() {
  return pool.connect();
}

export default pool;
