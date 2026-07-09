/**
 * Branded HTML email for the bedrijfskennis-audit lead magnet (NL).
 * Matches Nativ brand: sage (#8B9A6B), cream (#F2EDE4), grey (#4A4A48).
 */

interface AuditEmailProps {
  name: string;
}

export function auditEmailHtml({ name }: AuditEmailProps): string {
  const firstName = name.split(" ")[0] || name;

  return `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Je bedrijfskennis-audit</title>
</head>
<body style="margin:0;padding:0;background-color:#F2EDE4;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#F2EDE4;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color:#FFFFFF;border-radius:12px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background-color:#8B9A6B;padding:32px 40px;">
              <p style="margin:0;font-size:24px;font-weight:700;color:#FFFFFF;letter-spacing:0.05em;">nativ</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h1 style="margin:0 0 16px;font-size:26px;color:#4A4A48;font-weight:400;line-height:1.3;">
                Hi ${firstName}, hier is je bedrijfskennis-audit
              </h1>

              <p style="margin:0 0 20px;font-size:16px;color:#4A4A48;line-height:1.6;font-weight:300;">
                Bedankt voor je interesse. In de bijlage vind je de audit als PDF. Print 'm of vul 'm digitaal in, en je ziet in tien minuten waar de kennis van je bedrijf zit en wat je riskeert.
              </p>

              <p style="margin:0 0 24px;font-size:15px;color:#6A6A68;line-height:1.6;font-style:italic;">
                De manier waarop je werkt, zit in de hoofden van je mensen. En loopt de deur uit zodra iemand vertrekt.
              </p>

              <p style="margin:0 0 8px;font-size:15px;color:#4A4A48;line-height:1.6;font-weight:300;">
                Meer dan drie vinkjes op de laatste pagina? Dan zit de kennis waar je op draait te veel in hoofden en te weinig op één plek. Precies dat lossen we op met een company brain.
              </p>

              <p style="margin:24px 0 8px;font-size:15px;color:#4A4A48;line-height:1.6;font-weight:300;">
                Benieuwd wat dat voor jouw organisatie betekent? We praten er graag over.
              </p>

              <p style="margin:0 0 8px;">
                <a href="https://gonativ.nl/contact" style="display:inline-block;background-color:#8B9A6B;color:#FFFFFF;text-decoration:none;padding:12px 24px;border-radius:8px;font-family:-apple-system,Arial,sans-serif;font-size:15px;font-weight:600;">Plan een kennismaking &rarr;</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #D8D4CC;">
              <p style="margin:0;font-family:-apple-system,Arial,sans-serif;font-size:12px;color:#8A8580;line-height:1.6;">
                nativ &middot; company brain | digital colleagues &middot; Nativ B.V. &middot; <a href="https://gonativ.nl" style="color:#6B7A4B;text-decoration:none;">gonativ.nl</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
