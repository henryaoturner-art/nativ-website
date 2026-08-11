import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import {
  completeScan,
  getReportPayload,
  getScanBundle,
  saveReportPayload,
} from "@/lib/scan/db";
import { COMPANY_QUESTIONS, DEPARTMENT_QUESTIONS } from "@/lib/scan/bank";
import {
  companyIsSolo,
  missingRequiredIds,
  type AnswerMap,
} from "@/lib/scan/visibility";
import {
  generateReportPayload,
  reportGenerationAvailable,
  type ReportPayload,
} from "@/lib/scan/report";

// Rapportgeneratie kan minuten duren; zonder dit kapt Vercel de functie af.
export const maxDuration = 300;

const BASE_URL = "https://gonativ.nl";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
const NOTIFY_EMAIL = process.env.LEAD_NOTIFY_EMAIL || "jorus@gonativ.nl";

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function topThree(payload: ReportPayload): string[] {
  return [
    ...payload.ranglijst.hierZouIkBeginnen,
    ...payload.ranglijst.sterkeKandidaten,
  ]
    .slice(0, 3)
    .map((item) => `${item.naam}: ${item.watHetKost.toLowerCase()}`);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { token?: string; lang?: string };
    if (!body.token) {
      return NextResponse.json({ error: "token is verplicht" }, { status: 400 });
    }
    const lang: "nl" | "en" = body.lang === "en" ? "en" : "nl";

    const bundle = await getScanBundle(body.token);
    if (!bundle) {
      return NextResponse.json({ error: "Scan niet gevonden" }, { status: 404 });
    }
    const { scan, respondents, answers } = bundle;
    if (scan.status !== "open") {
      // Al afgerond: geen fout, gewoon opnieuw naar het rapport.
      return NextResponse.json({ ok: true, reportUrl: `/scan/${scan.token}/rapport` });
    }
    const respondent = respondents[0];
    if (!respondent) {
      return NextResponse.json({ error: "Scan heeft geen respondent" }, { status: 500 });
    }

    // Afrond-controle op de server, met dezelfde evaluator als de wizard.
    const answerMap: AnswerMap = new Map(
      answers.map((row) => [row.question_id, row.value ?? ""]),
    );
    const options = { companySolo: companyIsSolo(answerMap) };
    const missing = [
      ...missingRequiredIds(COMPANY_QUESTIONS, answerMap, options),
      ...missingRequiredIds(DEPARTMENT_QUESTIONS, answerMap, options),
    ];
    if (missing.length > 0) {
      return NextResponse.json(
        { error: "Nog niet alle verplichte vragen zijn beantwoord", missing },
        { status: 422 },
      );
    }

    await completeScan(scan.id, respondent.id);

    // Rapport genereren als er een sleutel is; anders volgt het via de
    // rapportpagina zodra de sleutel er is. Fail-soft: een mislukte
    // generatie houdt het afronden niet tegen.
    let payload: ReportPayload | null = null;
    if (reportGenerationAvailable()) {
      try {
        payload = await generateReportPayload({
          companyName: scan.company_name,
          contactName: scan.contact_name,
          answers: answerMap,
          language: lang,
        });
        await saveReportPayload(scan.id, payload);
      } catch (err) {
        console.error("SCAN_REPORT_ERROR:", err);
        payload = (await getReportPayload(scan.id)) as ReportPayload | null;
      }
    }

    const reportUrl = `${BASE_URL}/scan/${scan.token}/rapport`;

    if (process.env.RESEND_API_KEY) {
      // Melding naar Jorus — wat je nodig hebt om te kunnen bellen.
      const topLines = payload
        ? topThree(payload)
            .map((line) => `<li>${esc(line)}</li>`)
            .join("")
        : "";
      try {
        await resend.emails.send({
          from: `Nativ website <${FROM_EMAIL}>`,
          to: [NOTIFY_EMAIL],
          replyTo: scan.contact_email,
          subject: `Scan afgerond: ${scan.company_name}`,
          html:
            `<p>Er is een scan afgerond op gonativ.nl:</p>` +
            `<ul>` +
            `<li><strong>Bedrijf:</strong> ${esc(scan.company_name)}</li>` +
            `<li><strong>Contactpersoon:</strong> ${esc(scan.contact_name)}</li>` +
            `<li><strong>E-mail:</strong> ${esc(scan.contact_email)}</li>` +
            `<li><strong>Vorm:</strong> solo (quick scan)</li>` +
            `</ul>` +
            (topLines
              ? `<p><strong>Top drie uit het rapport:</strong></p><ul>${topLines}</ul>`
              : `<p>Het rapport is nog niet gegenereerd (geen API-sleutel of generatie mislukt).</p>`) +
            `<p><a href="${reportUrl}">Bekijk het rapport</a></p>`,
        });
      } catch (err) {
        console.error("SCAN_NOTIFY_ERROR:", err);
      }

      // Mail naar de invuller met de eigen rapportlink — de reden om terug
      // te komen (datamodel-doc).
      try {
        const isEn = lang === "en";
        await resend.emails.send({
          from: `Nativ <${FROM_EMAIL}>`,
          to: [scan.contact_email],
          subject: isEn ? "Your scan report" : "Je scanrapport staat klaar",
          html: isEn
            ? `<p>Hi ${esc(scan.contact_name)},</p>` +
              `<p>Thanks for completing the scan. Your report is ready:</p>` +
              `<p><a href="${reportUrl}">${reportUrl}</a></p>` +
              `<p>This link is yours. Use it to revisit your report whenever you want.</p>` +
              `<p>Best,<br/>Nativ</p>`
            : `<p>Hi ${esc(scan.contact_name)},</p>` +
              `<p>Bedankt voor het invullen van de scan. Je rapport staat klaar:</p>` +
              `<p><a href="${reportUrl}">${reportUrl}</a></p>` +
              `<p>Deze link is van jou. Je kunt er altijd mee terug naar je rapport.</p>` +
              `<p>Vriendelijke groet,<br/>Nativ</p>`,
        });
      } catch (err) {
        console.error("SCAN_CONFIRM_ERROR:", err);
      }
    }

    console.log(
      "SCAN_COMPLETED:",
      JSON.stringify({ company: scan.company_name, email: scan.contact_email, report: Boolean(payload) }),
    );
    return NextResponse.json({ ok: true, reportUrl: `/scan/${scan.token}/rapport` });
  } catch (err) {
    console.error("SCAN_COMPLETE_ERROR:", err);
    return NextResponse.json({ error: "Afronden mislukte, probeer het opnieuw" }, { status: 500 });
  }
}
