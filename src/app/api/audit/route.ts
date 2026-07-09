import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { auditEmailHtml } from "@/lib/audit-email";
import { promises as fs } from "fs";
import path from "path";

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
const NOTIFY_EMAIL = process.env.AUDIT_NOTIFY_EMAIL || "jorus@gonativ.nl";
// Reuse the existing Nativ leads audience (same as the whitepaper flow).
const LEADS_AUDIENCE_ID = "b2df0faf-195b-4bdf-aa9e-75d78e3ff4b5";
const GOOGLE_SHEET_WEBHOOK = process.env.GOOGLE_SHEET_WEBHOOK_URL || "";

interface Lead {
  name: string;
  email: string;
  company: string;
  timestamp: string;
  source: string;
}

async function saveLeadToResend(lead: Lead) {
  try {
    if (!process.env.RESEND_API_KEY) return;
    const nameParts = lead.name.split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";
    await resend.contacts.create({
      audienceId: LEADS_AUDIENCE_ID,
      email: lead.email,
      firstName,
      lastName,
      unsubscribed: false,
    });
    console.log("RESEND_CONTACT_SAVED (audit):", lead.email);
  } catch (error) {
    console.error("Failed to save audit lead to Resend:", error);
  }
}

async function saveLeadToGoogleSheet(lead: Lead) {
  if (!GOOGLE_SHEET_WEBHOOK) return;
  try {
    await fetch(GOOGLE_SHEET_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    console.log("GOOGLE_SHEET_SAVED (audit):", lead.email);
  } catch (error) {
    console.error("Failed to save audit lead to Google Sheet:", error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      name?: string;
      email?: string;
      company?: string;
    };

    if (!body.name?.trim() || !body.email?.trim()) {
      return NextResponse.json(
        { error: "Naam en e-mail zijn verplicht" },
        { status: 400 }
      );
    }

    const lead: Lead = {
      name: body.name.trim(),
      email: body.email.trim(),
      company: body.company?.trim() || "",
      timestamp: new Date().toISOString(),
      source: "bedrijfskennis-audit",
    };

    console.log("AUDIT_LEAD:", JSON.stringify(lead));

    await saveLeadToResend(lead);
    await saveLeadToGoogleSheet(lead);

    // Read the audit PDF for attachment.
    const pdfPath = path.join(process.cwd(), "public", "downloads", "bedrijfskennis-audit.pdf");
    let pdfBuffer: Buffer | null = null;
    try {
      pdfBuffer = (await fs.readFile(pdfPath)) as Buffer;
    } catch {
      console.warn("Audit PDF not found at", pdfPath, "— sending email without attachment");
    }

    if (process.env.RESEND_API_KEY) {
      // 1. Deliver the audit to the downloader.
      const emailPayload: Parameters<typeof resend.emails.send>[0] = {
        from: `Nativ <${FROM_EMAIL}>`,
        to: [lead.email],
        subject: "Je bedrijfskennis-audit",
        html: auditEmailHtml({ name: lead.name }),
      };
      if (pdfBuffer) {
        emailPayload.attachments = [
          { filename: "nativ-bedrijfskennis-audit.pdf", content: pdfBuffer },
        ];
      }
      const { error } = await resend.emails.send(emailPayload);
      if (error) {
        console.error("Resend error (audit delivery):", error);
        return NextResponse.json(
          { error: "Verzenden mislukt. Probeer het opnieuw." },
          { status: 500 }
        );
      }

      // 2. Notify Jorus that someone downloaded the audit.
      try {
        await resend.emails.send({
          from: `Nativ <${FROM_EMAIL}>`,
          to: [NOTIFY_EMAIL],
          replyTo: lead.email,
          subject: `Nieuwe audit-download: ${lead.name}`,
          html:
            `<p>Iemand heeft de bedrijfskennis-audit gedownload:</p>` +
            `<ul>` +
            `<li><strong>Naam:</strong> ${lead.name}</li>` +
            `<li><strong>E-mail:</strong> ${lead.email}</li>` +
            `<li><strong>Bedrijf:</strong> ${lead.company || "—"}</li>` +
            `<li><strong>Tijd:</strong> ${lead.timestamp}</li>` +
            `</ul>`,
        });
      } catch (error) {
        // Never fail the download because the internal notification failed.
        console.error("Failed to send audit notification to Jorus:", error);
      }
    } else {
      console.warn("RESEND_API_KEY not set — audit email not sent");
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Audit API error:", error);
    return NextResponse.json({ error: "Interne serverfout" }, { status: 500 });
  }
}
