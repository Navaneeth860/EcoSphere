import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  console.error('FATAL: DATABASE_URL environment variable is missing.');
  process.exit(1);
}

// Supabase PostgreSQL pool with SSL enabled
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000
});

export const db = drizzle(pool);

export async function checkDatabaseHealth() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT NOW() as current_time, current_database() as db_name, version() as version;');
    return {
      connected: true,
      database: result.rows[0].db_name,
      serverTime: result.rows[0].current_time,
      version: result.rows[0].version
    };
  } finally {
    client.release();
  }
}

