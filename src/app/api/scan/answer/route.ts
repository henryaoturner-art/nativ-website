import { NextRequest, NextResponse } from "next/server";
import { COMPANY_QUESTIONS, questionById, type ScanQuestion } from "@/lib/scan/bank";
import { getScanAccess, markRespondentBusy, upsertAnswer } from "@/lib/scan/db";

const MAX_TEXT = 20_000;

/** Valideert en normaliseert een binnenkomende waarde per vraagtype.
 * Choice-waarden zijn optielabels (NL of EN); multi-choice een JSON-array
 * van labels — zie het opslagcontract in visibility.ts. */
function normalizeValue(question: ScanQuestion, raw: unknown): string | null {
  if (typeof raw !== "string" || raw.length > MAX_TEXT) return null;
  const value = raw.trim();
  if (value === "") return ""; // leegmaken mag: antwoord wissen

  const validLabels = new Set(
    (question.options ?? []).flatMap((o) => [o.nl, o.en]),
  );

  switch (question.type) {
    case "text":
      return value;
    case "number": {
      const num = Number(value.replace(",", "."));
      if (!Number.isFinite(num) || num < 0 || num > 1_000_000) return null;
      return String(num);
    }
    case "rating": {
      const num = Number(value);
      if (!Number.isInteger(num) || num < 1 || num > 5) return null;
      return String(num);
    }
    case "choice":
      return validLabels.has(value) ? value : null;
    case "multi-choice": {
      let labels: unknown;
      try {
        labels = JSON.parse(value);
      } catch {
        return null;
      }
      if (!Array.isArray(labels) || !labels.every((l) => typeof l === "string")) return null;
      if (!labels.every((l) => validLabels.has(l))) return null;
      if (question.maxSelect && labels.length > question.maxSelect) return null;
      return JSON.stringify(labels);
    }
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      token?: string;
      questionId?: string;
      value?: unknown;
    };
    if (!body.token || !body.questionId) {
      return NextResponse.json({ error: "token en questionId zijn verplicht" }, { status: 400 });
    }

    const question = questionById(body.questionId);
    if (!question) {
      return NextResponse.json({ error: "Onbekende vraag" }, { status: 400 });
    }

    const access = await getScanAccess(body.token);
    if (!access) {
      return NextResponse.json({ error: "Scan niet gevonden" }, { status: 404 });
    }
    if (access.scan.status !== "open") {
      return NextResponse.json({ error: "Deze scan is al afgerond" }, { status: 409 });
    }
    // Uitgenodigde collega's beantwoorden alleen de afdelingsvragen; de
    // bedrijfsvragen zijn van de eigenaar.
    if (!access.isOwner && COMPANY_QUESTIONS.some((q) => q.id === question.id)) {
      return NextResponse.json({ error: "Deze vraag hoort niet bij jouw deel" }, { status: 403 });
    }

    const value = normalizeValue(question, body.value);
    if (value === null) {
      return NextResponse.json({ error: "Ongeldige waarde" }, { status: 400 });
    }

    await upsertAnswer({
      scanId: access.scan.id,
      respondentId: access.respondent.id,
      departmentId: access.department.id,
      questionId: question.id,
      value,
    });
    // Eerste antwoord van een uitgenodigde → 'bezig' op het beheerscherm.
    if (!access.isOwner) await markRespondentBusy(access.respondent.id);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("SCAN_ANSWER_ERROR:", err);
    return NextResponse.json({ error: "Opslaan mislukte, probeer het opnieuw" }, { status: 500 });
  }
}
