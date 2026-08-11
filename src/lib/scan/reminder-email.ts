/**
 * De ene herinnering bij een half afgemaakte scan (48 uur stil). Zelfde
 * brand-template als de andere scanmails. Bewust maar één keer
 * (reminder_sent_at + §Follow-up discipline: geen guilt-framing, en er
 * expliciet bij dat niets doen ook prima is).
 *
 * Alleen Nederlands: de taal van de invuller wordt niet opgeslagen, en de
 * scan richt zich op het Nederlandse mkb.
 */

interface ReminderEmailProps {
  name: string;
  scanUrl: string;
}

export function reminderEmailSubject(): string {
  return "Je scan staat nog voor je klaar";
}

export function reminderEmailHtml({ name, scanUrl }: ReminderEmailProps): string {
  const firstNameRaw = name.trim().split(/\s+/)[0] || name.trim();
  const firstName = firstNameRaw.charAt(0).toUpperCase() + firstNameRaw.slice(1);

  return `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${reminderEmailSubject()}</title>
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
                Beste ${firstName},
              </p>

              <p style="margin:0 0 20px;font-size:16px;color:#4A4A48;line-height:1.6;font-weight:300;">
                Je begon een paar dagen geleden aan de AI-scan. Je antwoorden staan
                veilig opgeslagen, dus je kunt gewoon verdergaan waar je was gebleven.
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 0 12px;">
                <tr>
                  <td style="border-radius:8px;background-color:#8B9A6B;">
                    <a href="${scanUrl}" target="_blank" style="display:inline-block;padding:14px 32px;font-size:16px;color:#FFFFFF;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-weight:600;">
                      Ga verder met je scan →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 24px;font-size:13px;color:#4A4A48;opacity:0.55;line-height:1.5;font-family:Arial,Helvetica,sans-serif;word-break:break-all;">
                <a href="${scanUrl}" style="color:#8B9A6B;text-decoration:none;">${scanUrl}</a>
              </p>

              <p style="margin:0 0 32px;font-size:16px;color:#4A4A48;line-height:1.6;font-weight:300;">
                Wil je niet verder? Dan hoef je niets te doen; dit is de enige
                herinnering die we sturen. Na twaalf maanden verwijderen we je
                gegevens vanzelf.
              </p>

              <p style="margin:0;font-size:16px;color:#4A4A48;line-height:1.6;font-weight:300;">
                Vriendelijke groet,<br/>Jorus<br/>nativ
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
                <a href="https://gonativ.nl/privacy" style="color:#8B9A6B;text-decoration:none;">Privacyverklaring</a>
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
