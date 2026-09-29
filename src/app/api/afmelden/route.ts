import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
const NOTIFY_EMAIL = process.env.LEAD_NOTIFY_EMAIL || "jorus@gonativ.nl";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Zet het adres op de Instantly-blokkeerlijst: dan gaat er uit geen enkele campagne nog mail heen. */
async function blockInInstantly(email: string): Promise<boolean> {
  const key = process.env.INSTANTLY_API_KEY;
  if (!key) {
    console.warn("INSTANTLY_API_KEY not set — afmelding niet op de blokkeerlijst gezet");
    return false;
  }
  try {
    const res = await fetch("https://api.instantly.ai/api/v2/block-lists-entries", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ bl_value: email }),
    });
    if (!res.ok) {
      console.error("Instantly blocklist error:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("Instantly blocklist error:", error);
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { email?: string };
    const email = (body.email || "").trim().toLowerCase();
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Ongeldig mailadres" }, { status: 400 });
    }

    const blocked = await blockInInstantly(email);
    const timestamp = new Date().toISOString();
    console.log("AFMELDING:", JSON.stringify({ email, blocked, timestamp }));

    // Een mens krijgt altijd bericht. Lukte de blokkeerlijst niet, dan staat
    // dat bovenaan de mail en moet het met de hand gebeuren.
    let notified = false;
    if (process.env.RESEND_API_KEY) {
      const { error } = await resend.emails.send({
        from: `Nativ website <${FROM_EMAIL}>`,
        to: [NOTIFY_EMAIL],
        subject: blocked
          ? `Afmelding: ${email}`
          : `ACTIE NODIG — afmelding niet op de blokkeerlijst: ${email}`,
        html:
          (blocked
            ? `<p>${esc(email)} heeft zich afgemeld via gonativ.nl/afmelden en staat op de Instantly-blokkeerlijst.</p>`
            : `<p><strong>De blokkeerlijst in Instantly kon niet worden bijgewerkt.</strong> Zet ${esc(email)} met de hand op de blokkeerlijst.</p>`) +
          `<p style="color:#8A8580;font-size:12px">Tijd: ${timestamp}</p>`,
      });
      if (error) console.error("Resend error (afmelden):", error);
      else notified = true;
    }

    if (!blocked && !notified) {
      return NextResponse.json({ error: "Afmelden mislukt" }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Afmelden API error:", error);
    return NextResponse.json({ error: "Interne serverfout" }, { status: 500 });
  }
}
