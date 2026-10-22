import { checkDatabaseHealth, pool } from './index.js';

async function main() {
  console.log('Testing Supabase PostgreSQL connection...');
  try {
    const health = await checkDatabaseHealth();
    console.log('--- SUPABASE CONNECTION SUCCESSFUL ---');
    console.log('Database Name:', health.database);
    console.log('Server Time:', health.serverTime);
    console.log('PostgreSQL Version:', health.version);
    console.log('--------------------------------------');
  } catch (error) {
    console.error('--- SUPABASE CONNECTION FAILED ---');
    console.error('Error Code:', error.code);
    console.error('Message:', error.message);
    console.error('Details:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
