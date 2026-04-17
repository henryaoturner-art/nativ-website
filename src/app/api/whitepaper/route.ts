import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { whitepaperEmailHtml } from "@/lib/whitepaper-email";
import { promises as fs } from "fs";
import path from "path";

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
const LEADS_FILE = path.join(process.cwd(), "data", "whitepaper-leads.json");

interface Lead {
  name: string;
  email: string;
  company: string;
  role: string;
  timestamp: string;
}

async function saveLead(lead: Lead) {
  try {
    // Ensure data directory exists
    const dir = path.dirname(LEADS_FILE);
    await fs.mkdir(dir, { recursive: true });

    // Read existing leads or start fresh
    let leads: Lead[] = [];
    try {
      const existing = await fs.readFile(LEADS_FILE, "utf-8");
      leads = JSON.parse(existing);
    } catch {
      // File doesn't exist yet — start empty
    }

    leads.push(lead);
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to save lead:", error);
    // Don't fail the request if lead saving fails
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields
    if (!body.name?.trim() || !body.email?.trim()) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const lead: Lead = {
      name: body.name.trim(),
      email: body.email.trim(),
      company: body.company?.trim() || "",
      role: body.role?.trim() || "",
      timestamp: new Date().toISOString(),
    };

    // Save lead to file
    await saveLead(lead);

    // Also log to console for Vercel logs
    console.log("WHITEPAPER_LEAD:", JSON.stringify(lead));

    // Read the PDF attachment
    const pdfPath = path.join(process.cwd(), "public", "downloads", "nativ-whitepaper-nl-volledig.pdf");
    let pdfBuffer: Buffer | null = null;
    try {
      pdfBuffer = await fs.readFile(pdfPath) as Buffer;
    } catch {
      console.warn("White paper PDF not found at", pdfPath, "— sending email without attachment");
    }

    // Send email via Resend
    if (process.env.RESEND_API_KEY) {
      const emailPayload: Parameters<typeof resend.emails.send>[0] = {
        from: `Nativ <${FROM_EMAIL}>`,
        to: [lead.email],
        subject: "Your Nativ White Paper — It's in your head",
        html: whitepaperEmailHtml({ name: lead.name }),
      };

      // Attach PDF if available
      if (pdfBuffer) {
        emailPayload.attachments = [
          {
            filename: "nativ-whitepaper-its-in-your-head.pdf",
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
