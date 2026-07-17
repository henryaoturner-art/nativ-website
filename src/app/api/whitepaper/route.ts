import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { whitepaperEmailHtml } from "@/lib/whitepaper-email";
import { promises as fs } from "fs";
import path from "path";

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
const NOTIFY_EMAIL = process.env.LEAD_NOTIFY_EMAIL || "jorus@gonativ.nl";
const WHITEPAPER_AUDIENCE_ID = "b2df0faf-195b-4bdf-aa9e-75d78e3ff4b5";
const GOOGLE_SHEET_WEBHOOK = process.env.GOOGLE_SHEET_WEBHOOK_URL || "";

interface Lead {
  name: string;
  email: string;
  company: string;
  role: string;
  timestamp: string;
  language?: string;
}

async function saveLeadToResend(lead: Lead) {
  try {
    if (!process.env.RESEND_API_KEY) return;

    // Split name into first/last
    const nameParts = lead.name.split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    await resend.contacts.create({
      audienceId: WHITEPAPER_AUDIENCE_ID,
      email: lead.email,
      firstName,
      lastName,
      unsubscribed: false,
    });

    console.log("RESEND_CONTACT_SAVED:", lead.email);
  } catch (error) {
    console.error("Failed to save lead to Resend:", error);
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
    console.log("GOOGLE_SHEET_SAVED:", lead.email);
  } catch (error) {
    console.error("Failed to save lead to Google Sheet:", error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      name?: string;
      email?: string;
      company?: string;
      role?: string;
      language?: string;
    };

    // Validate required fields
    if (!body.name?.trim() || !body.email?.trim()) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Determine language from request
    const language = body.language || 'nl'; // Default to Dutch

    const lead: Lead = {
      name: body.name.trim(),
      email: body.email.trim(),
      company: body.company?.trim() || "",
      role: body.role?.trim() || "",
      timestamp: new Date().toISOString(),
      language: language,
    };

    // Log to Vercel logs (always works)
    console.log("WHITEPAPER_LEAD:", JSON.stringify(lead));

    // Save lead to Resend Contacts (persistent, viewable in dashboard)
    await saveLeadToResend(lead);

    // Save lead to Google Sheet (if webhook configured)
    await saveLeadToGoogleSheet(lead);

    // Read the appropriate PDF attachment based on language
    const pdfFilename = language === 'en' 
      ? 'nativ-whitepaper-v2.2-en.pdf'
      : 'nativ-whitepaper-v2.2-nl.pdf';
    const pdfPath = path.join(process.cwd(), "public", "downloads", pdfFilename);
    let pdfBuffer: Buffer | null = null;
    try {
      pdfBuffer = await fs.readFile(pdfPath) as Buffer;
    } catch {
      console.warn("Whitepaper PDF not found at", pdfPath, "— sending email without attachment");
    }

    // Send email via Resend
    if (process.env.RESEND_API_KEY) {
      const emailPayload: Parameters<typeof resend.emails.send>[0] = {
        from: `nativ <${FROM_EMAIL}>`,
        to: [lead.email],
        subject: language === 'en' 
          ? "Your nativ whitepaper: Company brain"
          : "Je nativ whitepaper: Company brain",
        html: whitepaperEmailHtml({ name: lead.name, language }),
      };

      // Attach PDF if available
      if (pdfBuffer) {
        emailPayload.attachments = [
          {
            filename: language === 'en'
              ? "nativ-whitepaper-company-brain-en.pdf"
              : "nativ-whitepaper-company-brain-nl.pdf",
            content: pdfBuffer,
          },
        ];
      }

      const { error } = await resend.emails.send(emailPayload);

      if (error) {
        console.error("Resend error:", error);
        return NextResponse.json(
          { error: "Failed to send email. Please try again." },
          { status: 500 }
        );
      }

      // Notify Jorus that someone downloaded the whitepaper.
      try {
        await resend.emails.send({
          from: `Nativ <${FROM_EMAIL}>`,
          to: [NOTIFY_EMAIL],
          replyTo: lead.email,
          subject: `Nieuwe whitepaper-download: ${lead.name}`,
          html:
            `<p>Iemand heeft het whitepaper gedownload:</p>` +
            `<ul>` +
            `<li><strong>Naam:</strong> ${lead.name}</li>` +
            `<li><strong>E-mail:</strong> ${lead.email}</li>` +
            `<li><strong>Bedrijf:</strong> ${lead.company || "—"}</li>` +
            `<li><strong>Functie:</strong> ${lead.role || "—"}</li>` +
            `<li><strong>Taal:</strong> ${lead.language}</li>` +
            `<li><strong>Tijd:</strong> ${lead.timestamp}</li>` +
            `</ul>`,
        });
      } catch (notifyError) {
        console.error("Failed to send whitepaper notification to Jorus:", notifyError);
      }
    } else {
      console.warn("RESEND_API_KEY not set — email not sent");
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Whitepaper API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
