// Waar komen de scan-invullers vandaan?
// Gebruik: node --env-file=.env.local scripts/scan-herkomst.mjs [dagen]
//
// Twee kolommen, twee verschillende vragen:
//   bron        = de code achter de link (?bron=mail), dus wat wij zelf stuurden
//   hoe ken je  = wat de invuller zelf koos in het startformulier
// Ze horen niet gelijk te zijn. Het verschil is precies het deel van de
// klantreis dat je anders niet ziet.
import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

let url = process.env.DATABASE_URL;
if (!url) {
  const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
  const m = env.match(/^DATABASE_URL=(.*)$/m);
  if (m) url = m[1].trim().replace(/^["']|["']$/g, "");
}
if (!url) throw new Error("DATABASE_URL niet gevonden");
const sql = neon(url);

const days = Number(process.argv[2]) || 90;
const TEST = `(company_name ILIKE '%testscan%' OR company_name ILIKE '%nativ qa%' OR contact_email = 'jorus@gonativ.nl')`;

const rows = await sql.query(
  `SELECT source, heard_about, status, created_at, company_name
     FROM scan
    WHERE created_at > now() - ($1 || ' days')::interval
      AND NOT ${TEST}
    ORDER BY created_at`,
  [String(days)],
);

function tally(key) {
  const counts = new Map();
  for (const r of rows) {
    const k = r[key] || "(onbekend)";
    const c = counts.get(k) ?? { totaal: 0, afgerond: 0 };
    c.totaal += 1;
    if (r.status === "afgerond") c.afgerond += 1;
    counts.set(k, c);
  }
  return [...counts.entries()].sort((a, b) => b[1].totaal - a[1].totaal);
}

function table(title, key) {
  console.log(`\n=== ${title} ===`);
  const t = tally(key);
  if (!t.length) return console.log("  geen scans in deze periode");
  const w = Math.max(...t.map(([k]) => k.length), 12);
  for (const [k, c] of t) {
    console.log(`  ${k.padEnd(w)}  ${String(c.totaal).padStart(3)} gestart   ${String(c.afgerond).padStart(3)} afgerond`);
  }
}

console.log(`Scans van de laatste ${days} dagen, testrecords eruit: ${rows.length}`);
table("Bron achter de link", "source");
table("Hoe ken je ons", "heard_about");

const zonderBron = rows.filter((r) => !r.source).length;
if (zonderBron) {
  console.log(
    `\nLet op: ${zonderBron} van de ${rows.length} scans kwam binnen zonder bron-code.`,
  );
  console.log("Die link stond ergens zonder ?bron=, of iemand tikte het adres zelf in.");
}
