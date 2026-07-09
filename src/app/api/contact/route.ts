import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
const NOTIFY_EMAIL = process.env.LEAD_NOTIFY_EMAIL || "jorus@gonativ.nl";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      name?: string;
      email?: string;
      company?: string;
      message?: string;
    };

    if (!body.name?.trim() || !body.email?.trim()) {
      return NextResponse.json(
        { error: "Naam en e-mail zijn verplicht" },
        { status: 400 }
      );
    }

    const lead = {
      name: body.name.trim(),
      email: body.email.trim(),
      company: body.company?.trim() || "",
      message: body.message?.trim() || "",
      timestamp: new Date().toISOString(),
    };

    // Always log — survives even if email delivery is misconfigured.
    console.log("CONTACT_LEAD:", JSON.stringify(lead));

    if (process.env.RESEND_API_KEY) {
      const { error } = await resend.emails.send({
        from: `Nativ website <${FROM_EMAIL}>`,
        to: [NOTIFY_EMAIL],
        replyTo: lead.email,
        subject: `Nieuw contactbericht: ${lead.name}`,
        html:
          `<p>Nieuw bericht via het contactformulier op gonativ.nl:</p>` +
          `<ul>` +
          `<li><strong>Naam:</strong> ${esc(lead.name)}</li>` +
          `<li><strong>E-mail:</strong> ${esc(lead.email)}</li>` +
          `<li><strong>Bedrijf:</strong> ${esc(lead.company) || "—"}</li>` +
          `<li><strong>Tijd:</strong> ${lead.timestamp}</li>` +
          `</ul>` +
          `<p><strong>Bericht:</strong></p>` +
          `<p style="white-space:pre-wrap">${esc(lead.message) || "—"}</p>` +
          `<p style="color:#8A8580;font-size:12px">Antwoorden gaat rechtstreeks naar ${esc(lead.email)}.</p>`,
      });
      if (error) {
        console.error("Resend error (contact):", error);
        return NextResponse.json(
          { error: "Verzenden mislukt. Probeer het opnieuw." },
          { status: 500 }
        );
      }
    } else {
      console.warn("RESEND_API_KEY not set — contact email not sent");
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Interne serverfout" }, { status: 500 });
  }
}
