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
  /** Taal van de invuller — stuurt de taal van laat-gegenereerde rapporten. */
  language: "nl" | "en";
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
  /** `team` = de invuller koos "met je team": hij vult eerst zelf in en komt
   * daarna op het beheerscherm in plaats van op het rapport. */
  mode?: "quick" | "team";
  language?: "nl" | "en";
}): Promise<{ scanToken: string }> {
  const db = sql();
  const scanId = randomUUID();
  const departmentId = randomUUID();
  const respondentId = randomUUID();
  const scanToken = newToken();
  const respondentToken = newToken();

  await db.transaction([
    db.query(
      `INSERT INTO scan (id, token, mode, company_name, contact_name, contact_email, bank_version, status, language)
       VALUES ($1, $2, $7, $3, $4, $5, $6, 'open', $8)`,
      [
        scanId,
        scanToken,
        input.companyName,
        input.contactName,
        input.contactEmail,
        input.bankVersion,
        input.mode ?? "quick",
        input.language ?? "nl",
      ],
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

export interface ScanAccess {
  scan: ScanRow;
  respondent: RespondentRow;
  department: DepartmentRow;
  /** true = het scan-token van de eigenaar, false = de persoonlijke link van
   * een uitgenodigde collega. Bepaalt wie mag afronden en wie het rapport ziet. */
  isOwner: boolean;
}

/** Lichte resolver voor de autosave. Accepteert twee soorten token: het
 * scan-token van de eigenaar (→ de eerste respondent, dat is hijzelf) of de
 * persoonlijke link van een uitgenodigde collega (→ die respondent en zijn
 * eigen afdeling). Eén resolver, zodat de antwoord-route niet hoeft te weten
 * wie er invult. */
export async function getScanAccess(token: string): Promise<ScanAccess | null> {
  const db = sql();
  const scans = (await db.query(`SELECT * FROM scan WHERE token = $1`, [token])) as ScanRow[];
  const scan = scans[0];

  if (scan) {
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
    return { scan, respondent, department, isOwner: true };
  }

  const respondentRows = (await db.query(`SELECT * FROM scan_respondent WHERE token = $1`, [
    token,
  ])) as RespondentRow[];
  const respondent = respondentRows[0];
  if (!respondent || !respondent.department_id) return null;
  const [ownerScans, departmentRows] = await Promise.all([
    db.query(`SELECT * FROM scan WHERE id = $1`, [respondent.scan_id]),
    db.query(`SELECT * FROM scan_department WHERE id = $1`, [respondent.department_id]),
  ]);
  const ownerScan = (ownerScans as ScanRow[])[0];
  const department = (departmentRows as DepartmentRow[])[0];
  if (!ownerScan || !department) return null;
  return { scan: ownerScan, respondent, department, isOwner: false };
}

/** Een afdeling met de uitgenodigde collega's erin. De scan gaat hiermee van
 * `quick` naar `team`: geen nieuwe scan, alleen rijen erbij (datamodel-doc). */
export async function addDepartmentWithRespondents(input: {
  scanId: string;
  departmentName: string;
  sortOrder: number;
  people: { name: string; email: string }[];
}): Promise<{ departmentId: string; invited: { name: string; email: string; token: string }[] }> {
  const db = sql();
  const departmentId = randomUUID();
  const invited = input.people.map((person) => ({ ...person, token: newToken() }));

  await db.transaction([
    // Uitnodigen na een afgerond solo-rapport heropent de scan; het bestaande
    // rapport blijft staan tot de eigenaar opnieuw afrondt.
    db.query(`UPDATE scan SET mode = 'team', status = 'open', completed_at = NULL WHERE id = $1`, [
      input.scanId,
    ]),
    db.query(`INSERT INTO scan_department (id, scan_id, name, sort_order) VALUES ($1, $2, $3, $4)`, [
      departmentId,
      input.scanId,
      input.departmentName,
      input.sortOrder,
    ]),
    ...invited.map((person) =>
      db.query(
        `INSERT INTO scan_respondent (id, scan_id, department_id, name, email, token, status)
         VALUES ($1, $2, $3, $4, $5, $6, 'uitgenodigd')`,
        [randomUUID(), input.scanId, departmentId, person.name, person.email, person.token],
      ),
    ),
  ]);

  return { departmentId, invited };
}

/** Een uitgenodigde collega rondt zijn eigen deel af. Raakt de scan zelf niet:
 * alleen de eigenaar bepaalt wanneer het rapport gemaakt wordt. */
export async function completeRespondent(respondentId: string): Promise<void> {
  const db = sql();
  await db.query(
    `UPDATE scan_respondent SET status = 'klaar', completed_at = now() WHERE id = $1`,
    [respondentId],
  );
}

/** Eerste opgeslagen antwoord zet een uitgenodigde op 'bezig', zodat de
 * eigenaar op zijn beheerscherm ziet dat iemand begonnen is. */
export async function markRespondentBusy(respondentId: string): Promise<void> {
  const db = sql();
  await db.query(
    `UPDATE scan_respondent SET status = 'bezig' WHERE id = $1 AND status = 'uitgenodigd'`,
    [respondentId],
  );
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

export async function completeScan(
  scanId: string,
  respondentId: string,
  language: "nl" | "en",
): Promise<void> {
  const db = sql();
  // De taal wordt hier vastgezet: de wizard geeft bij het afronden de
  // actuele taalkeuze mee, en die is leidend voor laat-gegenereerde
  // rapporten (invuller kan tussen aanmaken en afronden gewisseld zijn).
  await db.transaction([
    db.query(
      `UPDATE scan SET status = 'afgerond', completed_at = now(), language = $2
       WHERE id = $1 AND status = 'open'`,
      [scanId, language],
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

/** Bewaren, niet elke keer opnieuw genereren (datamodel-doc).
 * Geeft terug of dit de EERSTE keer was dat er een rapport werd bewaard.
 * Daarop hangt de "je rapport staat klaar"-mail: die gaat één keer weg, ook
 * als twee bezoeken tegelijk het rapport genereren (xmax = 0 betekent: echt
 * ingevoegd, geen update van een bestaande rij). */
export async function saveReportPayload(scanId: string, payload: unknown): Promise<boolean> {
  const db = sql();
  const rows = (await db.query(
    `INSERT INTO scan_report (scan_id, payload) VALUES ($1, $2)
     ON CONFLICT (scan_id) DO UPDATE SET payload = EXCLUDED.payload, generated_at = now()
     RETURNING (xmax = 0) AS inserted`,
    [scanId, JSON.stringify(payload)],
  )) as { inserted: boolean }[];
  return rows[0]?.inserted ?? false;
}
