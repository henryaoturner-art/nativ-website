// Past db/schema.sql toe op de Neon-database.
// Gebruik: node --env-file=.env.local db/migrate.mjs
import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'node:fs';

const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
if (!url) {
  console.error('DATABASE_URL ontbreekt — draai met --env-file=.env.local');
  process.exit(1);
}

const sql = neon(url);
const statements = readFileSync(new URL('./schema.sql', import.meta.url), 'utf8')
  .split(';')
  .map((s) => s.trim())
  .filter((s) => s.length > 0);

for (const statement of statements) {
  await sql.query(statement);
}

const tables = await sql.query(
  "SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename"
);
const rows = Array.isArray(tables) ? tables : tables.rows;
console.log('Tabellen:', rows.map((r) => r.tablename).join(', '));
