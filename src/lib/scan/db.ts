/**
 * Databaselaag van de scan — Neon Postgres via de serverless driver.
 * Schema: db/schema.sql (bron: gtm/scan/website-datamodel-2026-08-10.md).
 * Alleen vanuit server-code gebruiken (API-routes, server components).
 */
import { neon } from "@neondatabase/serverless";
import { randomBytes, randomUUID } from "node:crypto";

function sql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is niet gezet");
  return neon(url);
}

/** URL-veilig toegangstoken — dit is de toegangscontrole (datamodel-doc). */
export function newToken(): string {
  return randomBytes(24).toString("base64url");
}

export interface ScanRow {
  id: string;
  token: string;
  mode: "quick" | "team";
  company_name: string;
  contact_name: string;
  contact_email: string;
  bank_version: string;
  status: "open" | "afgerond";
  created_at: string;
  completed_at: string | null;
}

export interface RespondentRow {
  id: string;
  scan_id: string;
  department_id: string | null;
  name: string;
  email: string | null;
  token: string;
  status: "uitgenodigd" | "bezig" | "klaar";
}

export interface DepartmentRow {
  id: string;
  scan_id: string;
  name: string;
  sort_order: number;
}

export interface AnswerRow {
  question_id: string;
  value: string | null;
  respondent_id: string;
  department_id: string;
}

export interface ScanBundle {
  scan: ScanRow;
  departments: DepartmentRow[];
  respondents: RespondentRow[];
  answers: AnswerRow[];
}

export async function createQuickScan(input: {
  companyName: string;
  contactName: string;
  contactEmail: string;
  bankVersion: string;
  departmentName: string;
}): Promise<{ scanToken: string }> {
  const db = sql();
  const scanId = randomUUID();
  const departmentId = randomUUID();
  const respondentId = randomUUID();
  const scanToken = newToken();
  const respondentToken = newToken();

  await db.transaction([
    db.query(
      `INSERT INTO scan (id, token, mode, company_name, contact_name, contact_email, bank_version, status)
       VALUES ($1, $2, 'quick', $3, $4, $5, $6, 'open')`,
      [scanId, scanToken, input.companyName, input.contactName, input.contactEmail, input.bankVersion],
    ),
    db.query(
      `INSERT INTO scan_department (id, scan_id, name, sort_order) VALUES ($1, $2, $3, 0)`,
      [departmentId, scanId, input.departmentName],
    ),
    db.query(
      `INSERT INTO scan_respondent (id, scan_id, department_id, name, email, token, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'bezig')`,
      [respondentId, scanId, departmentId, input.contactName, input.contactEmail, respondentToken],
    ),
  ]);

  return { scanToken };
}

export async function getScanBundle(token: string): Promise<ScanBundle | null> {
  const db = sql();
  const scans = (await db.query(`SELECT * FROM scan WHERE token = $1`, [token])) as ScanRow[];
  const scan = scans[0];
  if (!scan) return null;
  const [departments, respondents, answers] = await Promise.all([
    db.query(`SELECT * FROM scan_department WHERE scan_id = $1 ORDER BY sort_order`, [scan.id]),
    db.query(`SELECT * FROM scan_respondent WHERE scan_id = $1 ORDER BY invited_at`, [scan.id]),
    db.query(
      `SELECT question_id, value, respondent_id, department_id FROM scan_answer WHERE scan_id = $1`,
      [scan.id],
    ),
  ]);
  return {
    scan,
    departments: departments as DepartmentRow[],
    respondents: respondents as RespondentRow[],
    answers: answers as AnswerRow[],
  };
}

/** Lichte resolver voor de autosave: scan + eerste respondent/afdeling,
 * zonder de antwoorden mee te trekken. */
export async function getScanAccess(token: string): Promise<{
  scan: ScanRow;
  respondent: RespondentRow;
  department: DepartmentRow;
} | null> {
  const db = sql();
  const scans = (await db.query(`SELECT * FROM scan WHERE token = $1`, [token])) as ScanRow[];
  const scan = scans[0];
  if (!scan) return null;
  const [respondentRows, departmentRows] = await Promise.all([
    db.query(`SELECT * FROM scan_respondent WHERE scan_id = $1 ORDER BY invited_at LIMIT 1`, [
      scan.id,
    ]),
    db.query(`SELECT * FROM scan_department WHERE scan_id = $1 ORDER BY sort_order LIMIT 1`, [
      scan.id,
    ]),
  ]);
  const respondent = (respondentRows as RespondentRow[])[0];
  const department = (departmentRows as DepartmentRow[])[0];
  if (!respondent || !department) return null;
  return { scan, respondent, department };
}

export async function upsertAnswer(input: {
  scanId: string;
  respondentId: string;
  departmentId: string;
  questionId: string;
  value: string;
}): Promise<void> {
  const db = sql();
  await db.query(
    `INSERT INTO scan_answer (scan_id, respondent_id, department_id, question_id, value)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (respondent_id, department_id, question_id)
     DO UPDATE SET value = EXCLUDED.value, updated_at = now()`,
    [input.scanId, input.respondentId, input.departmentId, input.questionId, input.value],
  );
}

export async function completeScan(scanId: string, respondentId: string): Promise<void> {
  const db = sql();
  await db.transaction([
    db.query(
      `UPDATE scan SET status = 'afgerond', completed_at = now() WHERE id = $1 AND status = 'open'`,
      [scanId],
    ),
    db.query(
      `UPDATE scan_respondent SET status = 'klaar', completed_at = now() WHERE id = $1`,
      [respondentId],
    ),
  ]);
}

export async function getReportPayload(scanId: string): Promise<unknown | null> {
  const db = sql();
  const rows = (await db.query(`SELECT payload FROM scan_report WHERE scan_id = $1`, [scanId])) as {
    payload: unknown;
  }[];
  return rows[0]?.payload ?? null;
}

/** Bewaren, niet elke keer opnieuw genereren (datamodel-doc). */
export async function saveReportPayload(scanId: string, payload: unknown): Promise<void> {
  const db = sql();
  await db.query(
    `INSERT INTO scan_report (scan_id, payload) VALUES ($1, $2)
     ON CONFLICT (scan_id) DO UPDATE SET payload = EXCLUDED.payload, generated_at = now()`,
    [scanId, JSON.stringify(payload)],
  );
}
