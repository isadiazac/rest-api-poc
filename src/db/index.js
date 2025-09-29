// src/db/index.js
import pkg from "pg";
import fs from "fs";
import path from "path";

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Migración automática
async function migrate() {
  try {
    const schemaPath = path.join(process.cwd(), "schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf8");
    await pool.query(schema);
    console.log("Database migrated successfully");
  } catch (err) {
    console.error("Migration failed:", err);
    throw err;
  }
}

export default pool;
export { migrate };
