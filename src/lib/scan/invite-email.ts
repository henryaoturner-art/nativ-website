/**
 * Uitnodigingsmail voor een collega die meedoet aan de scan (teamflow).
 * Zelfde brand-template als de scan- en whitepapermail.
 *
 * De ontvanger heeft hier zelf niet om gevraagd: hij wordt uitgenodigd door
 * iemand uit zijn eigen bedrijf. Daarom staat de naam van die persoon in de
 * eerste zin, en staat er kort bij wat er met zijn antwoorden gebeurt.
 */

interface InviteEmailProps {
  name: string;
  inviterName: string;
  companyName: string;
  departmentName: string;
  respondUrl: string;
  language?: string;
}

const translations = {
  nl: {
    lang: "nl",
    greeting: "Beste",
    intro: (inviter: string, company: string) =>
      `${inviter} doet voor ${company} een korte scan van het werk, en vraagt of jij meedoet voor je eigen afdeling.`,
    what: (department: string) =>
      `Je krijgt vragen over het werk in ${department}: wat je doet, hoe vaak het voorkomt en waar het blijft liggen. Het duurt ongeveer een uur en je hoeft niets voor te bereiden of te uploaden.`,
    cta: "Naar de vragen →",
    save: "Je antwoorden worden bewaard terwijl je bezig bent, dus je kunt tussendoor stoppen en later verder op dezelfde link.",
    data: (inviter: string) =>
      `Wat je invult komt terecht in het rapport dat ${inviter} krijgt. We vragen niet naar bestanden of vertrouwelijke gegevens.`,
    signOff: "Vriendelijke groet,",
    signName: "nativ",
    privacy: "Privacyverklaring",
  },
  en: {
    lang: "en",
    greeting: "Hi",
    intro: (inviter: string, company: string) =>
      `${inviter} is running a short scan of the work at ${company}, and is asking you to take part for your own department.`,
    what: (department: string) =>
      `You will get questions about the work in ${department}: what you do, how often it happens and where it gets stuck. It takes about an hour, and you do not need to prepare or upload anything.`,
    cta: "To the questions →",
    save: "Your answers are saved as you go, so you can stop halfway and continue later on the same link.",
    data: (inviter: string) =>
      `What you fill in ends up in the report ${inviter} receives. We do not ask for files or confidential data.`,
    signOff: "Best,",
    signName: "nativ",
    privacy: "Privacy statement",
  },
};

export function inviteEmailSubject(companyName: string, language = "nl"): string {
  return language === "en"
    ? `Take part in the scan for ${companyName}`
    : `Doe mee aan de scan voor ${companyName}`;
}

export function inviteEmailHtml({
  name,
  inviterName,
  companyName,
  departmentName,
  respondUrl,
  language = "nl",
}: InviteEmailProps): string {
  const firstNameRaw = name.trim().split(/\s+/)[0] || name.trim();
  const firstName = firstNameRaw.charAt(0).toUpperCase() + firstNameRaw.slice(1);
  const t = translations[language as keyof typeof translations] || translations.nl;

  return `
<!DOCTYPE html>
<html lang="${t.lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${inviteEmailSubject(companyName, language)}</title>
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

              <p style="margin:0 0 20px;font-size:16px;color:#4A4A48;line-height:1.6;font-weight:300;">
                ${t.intro(inviterName, companyName)}
              </p>

              <p style="margin:0 0 24px;font-size:16px;color:#4A4A48;line-height:1.6;font-weight:300;">
                ${t.what(departmentName)}
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 0 12px;">
                <tr>
                  <td style="border-radius:8px;background-color:#8B9A6B;">
                    <a href="${respondUrl}" target="_blank" style="display:inline-block;padding:14px 32px;font-size:16px;color:#FFFFFF;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-weight:600;">
                      ${t.cta}
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 24px;font-size:13px;color:#4A4A48;opacity:0.55;line-height:1.5;font-family:Arial,Helvetica,sans-serif;word-break:break-all;">
                <a href="${respondUrl}" style="color:#8B9A6B;text-decoration:none;">${respondUrl}</a>
              </p>

              <p style="margin:0 0 20px;font-size:16px;color:#4A4A48;line-height:1.6;font-weight:300;">
                ${t.save}
              </p>

              <p style="margin:0 0 32px;font-size:16px;color:#4A4A48;line-height:1.6;font-weight:300;">
                ${t.data(inviterName)}
              </p>

              <p style="margin:0;font-size:16px;color:#4A4A48;line-height:1.6;font-weight:300;">
                ${t.signOff}<br/>${t.signName}
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
