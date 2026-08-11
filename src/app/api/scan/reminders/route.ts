import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { resend } from "@/lib/resend";
import { reminderEmailHtml, reminderEmailSubject } from "@/lib/scan/reminder-email";

/**
 * Dagelijkse Vercel-cron (vercel.json): vindt half afgemaakte scans die 48 uur
 * stilliggen en stuurt PRECIES ÉÉN herinnering aan de invuller, plus een
 * seintje aan Jorus (een half afgemaakte scan is een warme lead die je anders
 * nooit ziet — datamodel-doc). `reminder_sent_at` voorkomt een tweede mail,
 * ook als de cron vaker draait.
 */

const BASE_URL = "https://gonativ.nl";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
const NOTIFY_EMAIL = process.env.LEAD_NOTIFY_EMAIL || "jorus@gonativ.nl";
const REPLY_TO_EMAIL = process.env.SCAN_REPLY_TO_EMAIL || "jorus@gonativ.nl";

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

interface StaleScan {
  id: string;
  token: string;
  company_name: string;
  contact_name: string;
  contact_email: string;
  answered: number;
  last_activity: string;
}

export async function GET(req: NextRequest) {
  // Vercel-cron stuurt Authorization: Bearer <CRON_SECRET>. Zonder geldig
  // secret doet deze route niets — hij verstuurt mail, dus niet vrij aanroepbaar.
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Niet toegestaan" }, { status: 401 });
  }
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "DATABASE_URL ontbreekt" }, { status: 500 });
  }

  try {
    const db = neon(process.env.DATABASE_URL);

    // Half afgemaakt = open, minstens één antwoord, en 48u geen activiteit.
    // Nooit eerder herinnerd. Ouder dan 30 dagen laten we met rust.
    const stale = (await db.query(
      `SELECT s.id, s.token, s.company_name, s.contact_name, s.contact_email,
              COUNT(a.id)::int AS answered,
              GREATEST(MAX(a.updated_at), s.created_at) AS last_activity
       FROM scan s
       JOIN scan_answer a ON a.scan_id = s.id
       WHERE s.status = 'open'
         AND s.reminder_sent_at IS NULL
         AND s.created_at > now() - interval '30 days'
       GROUP BY s.id
       HAVING GREATEST(MAX(a.updated_at), s.created_at) < now() - interval '48 hours'`,
      [],
    )) as StaleScan[];

    let reminded = 0;
    const failed: string[] = [];
    for (const scan of stale) {
      // Eerst claimen, dan mailen: een dubbele run kan zo nooit dubbel sturen.
      const claimed = (await db.query(
        `UPDATE scan SET reminder_sent_at = now()
         WHERE id = $1 AND reminder_sent_at IS NULL
         RETURNING id`,
        [scan.id],
      )) as { id: string }[];
      if (claimed.length === 0) continue;

      const scanUrl = `${BASE_URL}/scan/${scan.token}`;
      try {
        if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY ontbreekt");
        await resend.emails.send({
          from: `nativ <${FROM_EMAIL}>`,
          to: [scan.contact_email],
          replyTo: REPLY_TO_EMAIL,
          subject: reminderEmailSubject(),
          html: reminderEmailHtml({ name: scan.contact_name, scanUrl }),
        });
        reminded += 1;
      } catch (err) {
        console.error("SCAN_REMINDER_MAIL_ERROR:", scan.contact_email, err);
        failed.push(scan.company_name);
      }

      // Seintje aan Jorus: warme lead, ongeacht of de herinnering aankwam.
      try {
        if (process.env.RESEND_API_KEY) {
          await resend.emails.send({
            from: `Nativ website <${FROM_EMAIL}>`,
            to: [NOTIFY_EMAIL],
            replyTo: scan.contact_email,
            subject: `Half afgemaakte scan: ${scan.company_name}`,
            html:
              `<p>Deze scan ligt 48 uur stil; de invuller heeft net één herinnering gekregen.</p>` +
              `<ul>` +
              `<li><strong>Bedrijf:</strong> ${esc(scan.company_name)}</li>` +
              `<li><strong>Contactpersoon:</strong> ${esc(scan.contact_name)}</li>` +
              `<li><strong>E-mail:</strong> ${esc(scan.contact_email)}</li>` +
              `<li><strong>Beantwoord:</strong> ${scan.answered} vragen</li>` +
              `</ul>` +
              `<p><a href="${scanUrl}">Bekijk de scan</a></p>`,
          });
        }
      } catch (err) {
        console.error("SCAN_REMINDER_NOTIFY_ERROR:", err);
      }
    }

    console.log(
      "SCAN_REMINDERS:",
      JSON.stringify({ checked: stale.length, reminded, failed: failed.length }),
    );
    return NextResponse.json({ ok: true, checked: stale.length, reminded, failed });
  } catch (err) {
    console.error("SCAN_REMINDERS_ERROR:", err);
    return NextResponse.json({ error: "Herinneringsronde mislukte" }, { status: 500 });
  }
}
