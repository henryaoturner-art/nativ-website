import { NextRequest, NextResponse } from "next/server";
import { COMPANY_WIDE_DEPARTMENT, SCAN_BANK_VERSION } from "@/lib/scan/bank";
import { createQuickScan } from "@/lib/scan/db";
import { normaliseSource } from "@/lib/scan/source";

const MAX_FIELD = 200;
/** Vrije tekst uit het "hoe ken je ons"-veld blijft kort en zonder opmaak. */
const MAX_HEARD_ABOUT = 60;

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      companyName?: string;
      contactName?: string;
      contactEmail?: string;
      lang?: string;
      mode?: string;
      source?: string;
      heardAbout?: string;
    };

    const companyName = body.companyName?.trim() ?? "";
    const contactName = body.contactName?.trim() ?? "";
    const contactEmail = body.contactEmail?.trim() ?? "";

    if (!companyName || !contactName || !contactEmail) {
      return NextResponse.json(
        { error: "Bedrijfsnaam, naam en e-mail zijn verplicht" },
        { status: 400 },
      );
    }
    if (
      companyName.length > MAX_FIELD ||
      contactName.length > MAX_FIELD ||
      contactEmail.length > MAX_FIELD ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)
    ) {
      return NextResponse.json({ error: "Controleer je gegevens" }, { status: 400 });
    }

    const departmentName =
      body.lang === "en" ? COMPANY_WIDE_DEPARTMENT.en : COMPANY_WIDE_DEPARTMENT.nl;

    const mode: "quick" | "team" = body.mode === "team" ? "team" : "quick";
    const source = normaliseSource(body.source);
    const heardAbout = body.heardAbout?.trim().slice(0, MAX_HEARD_ABOUT) || null;

    const { scanToken } = await createQuickScan({
      companyName,
      contactName,
      contactEmail,
      bankVersion: SCAN_BANK_VERSION,
      departmentName,
      mode,
      language: body.lang === "en" ? "en" : "nl",
      source,
      heardAbout,
    });

    console.log(
      "SCAN_CREATED:",
      JSON.stringify({ companyName, contactEmail, mode, source, heardAbout }),
    );
    return NextResponse.json({ token: scanToken });
  } catch (err) {
    console.error("SCAN_CREATE_ERROR:", err);
    return NextResponse.json({ error: "Er ging iets mis, probeer het opnieuw" }, { status: 500 });
  }
}
