import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { addDepartmentWithRespondents, getScanBundle } from "@/lib/scan/db";
import { inviteEmailHtml, inviteEmailSubject } from "@/lib/scan/invite-email";

const BASE_URL = "https://gonativ.nl";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

const MAX_FIELD = 200;
const MAX_PEOPLE_PER_CALL = 25;
const MAX_RESPONDENTS_PER_SCAN = 250;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Afdeling aanmaken + collega's uitnodigen. Alleen met het scan-token van de
 * eigenaar; de persoonlijke links van collega's kunnen hier niets. */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      token?: string;
      departmentName?: string;
      people?: { name?: string; email?: string }[];
      lang?: string;
    };
    if (!body.token || !body.departmentName || !Array.isArray(body.people)) {
      return NextResponse.json(
        { error: "token, departmentName en people zijn verplicht" },
        { status: 400 },
      );
    }
    const lang: "nl" | "en" = body.lang === "en" ? "en" : "nl";

    const departmentName = body.departmentName.trim();
    if (!departmentName || departmentName.length > MAX_FIELD) {
      return NextResponse.json({ error: "Controleer de afdelingsnaam" }, { status: 400 });
    }

    const people = body.people.map((p) => ({
      name: (p.name ?? "").trim(),
      email: (p.email ?? "").trim().toLowerCase(),
    }));
    if (people.length === 0 || people.length > MAX_PEOPLE_PER_CALL) {
      return NextResponse.json(
        { error: `Nodig 1 tot ${MAX_PEOPLE_PER_CALL} collega's tegelijk uit` },
        { status: 400 },
      );
    }
    for (const person of people) {
      if (
        !person.name ||
        person.name.length > MAX_FIELD ||
        person.email.length > MAX_FIELD ||
        !EMAIL_RE.test(person.email)
      ) {
        return NextResponse.json({ error: "Controleer de namen en e-mailadressen" }, { status: 400 });
      }
    }

    // Alleen het token van de eigenaar resolvet naar een scan-bundle;
    // respondent-tokens vallen hier vanzelf uit (scan niet gevonden).
    const bundle = await getScanBundle(body.token);
    if (!bundle) {
      return NextResponse.json({ error: "Scan niet gevonden" }, { status: 404 });
    }
    // Geen status-check: uitnodigen na een afgerond solo-rapport mag en
    // heropent de scan (addDepartmentWithRespondents zet status terug op open).
    const { scan, departments, respondents } = bundle;
    if (respondents.length + people.length > MAX_RESPONDENTS_PER_SCAN) {
      return NextResponse.json({ error: "Maximum aantal deelnemers bereikt" }, { status: 409 });
    }

    // Dubbel uitnodigen voorkomen: een adres dat al aan deze scan hangt slaan
    // we over in plaats van een tweede link te maken.
    const known = new Set(respondents.map((r) => (r.email ?? "").toLowerCase()).filter(Boolean));
    const fresh = people.filter((p) => !known.has(p.email));
    const skipped = people.length - fresh.length;
    if (fresh.length === 0) {
      return NextResponse.json(
        { error: "Iedereen op deze lijst is al uitgenodigd voor deze scan" },
        { status: 409 },
      );
    }

    const { invited } = await addDepartmentWithRespondents({
      scanId: scan.id,
      departmentName,
      sortOrder: departments.length,
      people: fresh,
    });

    // Mails na de transactie: de links bestaan al, dus een mailfout laat de
    // uitnodiging niet verdwijnen — de eigenaar ziet de link op zijn scherm
    // en kan hem zelf doorsturen.
    const failedEmails: string[] = [];
    if (process.env.RESEND_API_KEY) {
      for (const person of invited) {
        try {
          await resend.emails.send({
            from: `nativ <${FROM_EMAIL}>`,
            to: [person.email],
            replyTo: scan.contact_email,
            subject: inviteEmailSubject(scan.company_name, lang),
            html: inviteEmailHtml({
              name: person.name,
              inviterName: scan.contact_name,
              companyName: scan.company_name,
              departmentName,
              respondUrl: `${BASE_URL}/scan/respond/${person.token}`,
              language: lang,
            }),
          });
        } catch (err) {
          console.error("SCAN_INVITE_MAIL_ERROR:", person.email, err);
          failedEmails.push(person.email);
        }
      }
    } else {
      failedEmails.push(...invited.map((p) => p.email));
    }

    console.log(
      "SCAN_INVITED:",
      JSON.stringify({
        company: scan.company_name,
        department: departmentName,
        invited: invited.length,
        skipped,
        mailFailed: failedEmails.length,
      }),
    );
    return NextResponse.json({ ok: true, invited: invited.length, skipped, failedEmails });
  } catch (err) {
    console.error("SCAN_INVITE_ERROR:", err);
    return NextResponse.json({ error: "Uitnodigen mislukte, probeer het opnieuw" }, { status: 500 });
  }
}
