import { NextRequest, NextResponse } from "next/server";
import { COMPANY_QUESTIONS, DEPARTMENT_QUESTIONS } from "@/lib/scan/bank";
import { completeRespondent, getScanAccess, getScanBundle } from "@/lib/scan/db";
import { missingRequiredIds, type AnswerMap } from "@/lib/scan/visibility";

/** Rondt iemands EIGEN deel af zonder de scan af te ronden: een uitgenodigde
 * collega, of de eigenaar van een teamscan die eerst zijn eigen vragen doet.
 * Het rapport komt pas als de eigenaar de hele scan afrondt
 * (/api/scan/complete). */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { token?: string };
    if (!body.token) {
      return NextResponse.json({ error: "token is verplicht" }, { status: 400 });
    }

    const access = await getScanAccess(body.token);
    if (!access) {
      return NextResponse.json({ error: "Scan niet gevonden" }, { status: 404 });
    }
    if (access.scan.status !== "open") {
      return NextResponse.json({ error: "Deze scan is al afgerond" }, { status: 409 });
    }
    if (access.respondent.status === "klaar") {
      return NextResponse.json({ ok: true });
    }

    // Afrond-controle op de server, alleen over het eigen deel. De eigenaar
    // beantwoordt ook de bedrijfsvragen; welke urenvraag iemand kreeg volgt
    // uit zijn eigen dept-role-antwoord, dus dat hoeft hier niet meegegeven.
    const bundle = await getScanBundle(access.scan.token);
    if (!bundle) {
      return NextResponse.json({ error: "Scan niet gevonden" }, { status: 404 });
    }
    const own: AnswerMap = new Map(
      bundle.answers
        .filter((row) => row.respondent_id === access.respondent.id)
        .map((row) => [row.question_id, row.value ?? ""]),
    );
    const missing = access.isOwner
      ? [
          ...missingRequiredIds(COMPANY_QUESTIONS, own),
          ...missingRequiredIds(DEPARTMENT_QUESTIONS, own),
        ]
      : missingRequiredIds(DEPARTMENT_QUESTIONS, own);
    if (missing.length > 0) {
      return NextResponse.json(
        { error: "Nog niet alle verplichte vragen zijn beantwoord", missing },
        { status: 422 },
      );
    }

    await completeRespondent(access.respondent.id);
    console.log(
      "SCAN_RESPONDENT_DONE:",
      JSON.stringify({ company: access.scan.company_name, department: access.department.name }),
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("SCAN_RESPOND_ERROR:", err);
    return NextResponse.json({ error: "Afronden mislukte, probeer het opnieuw" }, { status: 500 });
  }
}
