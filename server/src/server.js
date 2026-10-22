import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { pool, checkDatabaseHealth } from './db/index.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());

// Initialize a live demo table in Supabase for real write/read demonstration
async function initDemoTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS demo_activities (
        id SERIAL PRIMARY KEY,
        student_name VARCHAR(100) NOT NULL DEFAULT 'Chetan Rao (BMSCE)',
        action_name VARCHAR(255) NOT NULL,
        category VARCHAR(50) NOT NULL,
        co2_kg NUMERIC(6, 3) NOT NULL,
        source_note VARCHAR(150) DEFAULT 'India GHG Program (2015) / Namma Metro CDM',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    // Insert 2 initial demo seed rows if table is empty
    const countRes = await pool.query('SELECT COUNT(*) FROM demo_activities;');
    if (parseInt(countRes.rows[0].count, 10) === 0) {
      await pool.query(`
        INSERT INTO demo_activities (student_name, action_name, category, co2_kg, source_note)
        VALUES 
          ('Chetan Rao (BMSCE)', 'Namma Metro Green Line (Banashankari to National College)', 'transport', 0.188, 'India GHG Program Table 5.4.1'),
          ('Chetan Rao (BMSCE)', 'South Indian Mess Canteen Lunch & Vidyarthi Bhavan Dosa', 'food', 1.700, 'India Dietary Assessment');
      `);
    }
    console.log('✅ Supabase "demo_activities" table verified and ready.');
  } catch (err) {
    console.error('⚠️ Could not initialize demo table:', err.message);
  }
}

// 1. Live Database Health & Metadata
app.get('/api/db-status', async (req, res) => {
  const start = Date.now();
  try {
    const health = await checkDatabaseHealth();
    const countRes = await pool.query('SELECT COUNT(*) FROM demo_activities;');
    const latencyMs = Date.now() - start;

    res.json({
      success: true,
      status: 'Connected',
      engine: 'PostgreSQL 17.11 (Supabase Cloud)',
      host: 'db.xbztcoqmlawmysgxuphq.supabase.co',
      database: health.database,
      serverTime: health.serverTime,
      version: health.version,
      table: 'demo_activities',
      totalRecordsInDb: parseInt(countRes.rows[0].count, 10),
      latencyMs: `${latencyMs}ms`
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      status: 'Disconnected',
      error: err.message
    });
  }
});

// 2. Fetch live records directly from Supabase
app.get('/api/demo-activities', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM demo_activities ORDER BY id DESC LIMIT 20;'
    );
    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Write real live transaction to Supabase
app.post('/api/demo-activities', async (req, res) => {
  const { studentName, actionName, category, co2Kg, sourceNote } = req.body;
  try {
    const query = `
      INSERT INTO demo_activities (student_name, action_name, category, co2_kg, source_note)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [
      studentName || 'Chetan Rao (BMSCE)',
      actionName || 'Namma Metro Round-Trip (Basavanagudi)',
      category || 'transport',
      co2Kg || 0.188,
      sourceNote || 'Live Supabase transaction from EcoSphere UI'
    ];

    const result = await pool.query(query, values);
    res.json({
      success: true,
      message: 'Transaction successfully persisted into Supabase PostgreSQL Cloud DB!',
      row: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, async () => {
  console.log(`🚀 EcoSphere Express API server running on http://localhost:${PORT}`);
  await initDemoTable();
});

