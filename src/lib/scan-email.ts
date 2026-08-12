/**
 * Branded HTML email for the free AI scan (multilingual).
 * Matches nativ brand: sage (#8B9A6B), cream (#F2EDE4), grey (#4A4A48).
 *
 * Drie toestanden, want de mail volgt de staat en belooft nooit een rapport
 * dat de pagina niet kan laten zien:
 * - "ready"       — meteen klaar bij het afronden.
 * - "pending"     — nog niet klaar; het rapport volgt op de eigen link.
 * - "readyLater"  — de na-mail: het rapport was er bij het afronden nog niet
 *                   en staat nu wél klaar. Zonder deze mail moet de invuller
 *                   uit zichzelf terugkomen om te zien of het er al is.
 */

export type ScanEmailState = "ready" | "pending" | "readyLater";

interface ScanEmailProps {
  name: string;
  reportUrl: string;
  state: ScanEmailState;
  language?: string;
}

const translations = {
  nl: {
    lang: "nl",
    greeting: "Beste",
    introReady: "Bedankt voor het invullen van de scan. Je rapport staat klaar:",
    introPending:
      "Bedankt voor het invullen van de scan. Je rapport wordt gemaakt en verschijnt op je eigen link:",
    introReadyLater: "Je rapport is klaar. Je vindt het op je eigen link:",
    cta: "Bekijk je rapport →",
    ownership:
      "Deze link is van jou. Je kunt er het komende jaar mee terug naar je rapport, en je mag hem delen met wie je wilt.",
    offer:
      "Wil je het rapport samen doorlopen? Antwoord op deze mail, dan plannen we iets.",
    signOff: "Vriendelijke groet,",
    signName: "Jorus",
    privacy: "Privacyverklaring",
  },
  en: {
    lang: "en",
    greeting: "Hi",
    introReady: "Thanks for completing the scan. Your report is ready:",
    introPending:
      "Thanks for completing the scan. Your report is being created and will appear on your own link:",
    introReadyLater: "Your report is ready. You will find it on your own link:",
    cta: "View your report →",
    ownership:
      "This link is yours. You can use it to return to your report for the next year, and you are free to share it with whoever you want.",
    offer:
      "Would you like to go through the report together? Reply to this email and we will plan something.",
    signOff: "Best,",
    signName: "Jorus",
    privacy: "Privacy statement",
  },
};

export function scanEmailSubject(state: ScanEmailState, language = "nl"): string {
  const isEn = language === "en";
  if (state === "pending") return isEn ? "Your scan is complete" : "Je scan is afgerond";
  return isEn ? "Your scan report is ready" : "Je scanrapport staat klaar";
}

export function scanEmailHtml({
  name,
  reportUrl,
  state,
  language = "nl",
}: ScanEmailProps): string {
  const firstNameRaw = name.trim().split(/\s+/)[0] || name.trim();
  const firstName = firstNameRaw.charAt(0).toUpperCase() + firstNameRaw.slice(1);
  const t = translations[language as keyof typeof translations] || translations.nl;

  return `
<!DOCTYPE html>
<html lang="${t.lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${scanEmailSubject(state, language)}</title>
</head>
<body style="margin:0;padding:0;background-color:#F2EDE4;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#F2EDE4;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color:#FFFFFF;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background-color:#8B9A6B;padding:32px 40px;">
              <p style="margin:0;font-size:24px;font-weight:700;color:#FFFFFF;letter-spacing:0.05em;">nativ</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <p style="margin:0 0 20px;font-size:16px;color:#4A4A48;line-height:1.6;font-weight:300;">
                ${t.greeting} ${firstName},
              </p>

              <p style="margin:0 0 24px;font-size:16px;color:#4A4A48;line-height:1.6;font-weight:300;">
                ${
                  state === "ready"
                    ? t.introReady
                    : state === "readyLater"
                      ? t.introReadyLater
                      : t.introPending
                }
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 0 12px;">
                <tr>
                  <td style="border-radius:8px;background-color:#8B9A6B;">
                    <a href="${reportUrl}" target="_blank" style="display:inline-block;padding:14px 32px;font-size:16px;color:#FFFFFF;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-weight:600;">
                      ${t.cta}
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 24px;font-size:13px;color:#4A4A48;opacity:0.55;line-height:1.5;font-family:Arial,Helvetica,sans-serif;word-break:break-all;">
                <a href="${reportUrl}" style="color:#8B9A6B;text-decoration:none;">${reportUrl}</a>
              </p>

              <p style="margin:0 0 20px;font-size:16px;color:#4A4A48;line-height:1.6;font-weight:300;">
                ${t.ownership}
              </p>

              <p style="margin:0 0 32px;font-size:16px;color:#4A4A48;line-height:1.6;font-weight:300;">
                ${t.offer}
              </p>

              <p style="margin:0;font-size:16px;color:#4A4A48;line-height:1.6;font-weight:300;">
                ${t.signOff}<br/>${t.signName}<br/>nativ
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;border-top:1px solid rgba(139,154,107,0.2);">
              <p style="margin:0 0 4px;font-size:13px;color:#4A4A48;opacity:0.5;font-family:Arial,Helvetica,sans-serif;">
                &copy; 2026 Nativ B.V. &middot; Amsterdam, NL
              </p>
              <p style="margin:0;font-size:13px;color:#4A4A48;opacity:0.4;font-family:Arial,Helvetica,sans-serif;">
                <a href="https://gonativ.nl" style="color:#8B9A6B;text-decoration:none;">gonativ.nl</a>
                 &middot;
                <a href="https://gonativ.nl/privacy" style="color:#8B9A6B;text-decoration:none;">${t.privacy}</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
}

/**
 * De "je rapport staat klaar"-mail voor als het rapport pas ná het afronden
 * gelukt is (readyLater). Eén plek, zodat elke route die alsnog een rapport
 * bewaart dezelfde mail stuurt. Fail-soft: een mislukte mail houdt het tonen
 * van het rapport nooit tegen.
 */
export async function sendReportReadyEmail(
  scan: { token: string; contact_name: string; contact_email: string },
  language = "nl",
): Promise<void> {
  if (!process.env.RESEND_API_KEY) return;
  const { resend } = await import("./resend");
  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const replyTo = process.env.SCAN_REPLY_TO_EMAIL || "jorus@gonativ.nl";
  const reportUrl = `https://gonativ.nl/scan/${scan.token}/rapport`;
  try {
    await resend.emails.send({
      from: `nativ <${fromEmail}>`,
      to: [scan.contact_email],
      replyTo,
      subject: scanEmailSubject("readyLater", language),
      html: scanEmailHtml({
        name: scan.contact_name,
        reportUrl,
        state: "readyLater",
        language,
      }),
    });
  } catch (err) {
    console.error("SCAN_REPORT_READY_MAIL_ERROR:", err);
  }
}
