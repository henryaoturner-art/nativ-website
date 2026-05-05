/**
 * Branded HTML email template for whitepaper delivery (multilingual).
 * Matches Nativ brand: sage (#8B9A6B), cream (#F2EDE4), grey (#4A4A48).
 */

interface WhitepaperEmailProps {
  name: string;
  language?: string;
}

const translations = {
  en: {
    lang: 'en',
    greeting: 'Hi',
    here: ', here\'s your whitepaper',
    thanks: 'Thank you for your interest in Nativ. Please find our whitepaper attached:',
    quote: '"Company brain — Knowledge from employees\' minds: minimum viable context (MVC™). Theory and practice."',
    discover: 'In this paper you\'ll discover:',
    bullet1: 'Why 80% of AI projects fail — and it\'s not the model',
    bullet2: 'The MVC™ Framework: 10 context blocks for AI agent tasks',
    bullet3: 'From unwritten knowledge to structured, usable context',
    bullet4: 'A practical implementation approach',
    questions: 'Questions? Or curious what AI could mean for your organization?',
    discuss: 'We\'d love to discuss it.',
    cta: 'Schedule a conversation →',
    privacy: 'Privacy policy'
  },
  nl: {
    lang: 'nl',
    greeting: 'Hoi',
    here: ', hier is je whitepaper',
    thanks: 'Bedankt voor je interesse in Nativ. In de bijlage vind je ons whitepaper:',
    quote: '"Company brain — Kennis uit de hoofden van medewerkers: minimum viable context (MVC™). De theorie en praktijk."',
    discover: 'In dit paper ontdek je:',
    bullet1: 'Waarom 80% van AI-projecten faalt — en het ligt niet aan het model',
    bullet2: 'Het MVC™ Framework: 10 contextblokken voor AI-agenttaken',
    bullet3: 'Van ongeschreven kennis naar gestructureerde, bruikbare context',
    bullet4: 'Een praktische implementatie-aanpak',
    questions: 'Vragen? Of benieuwd wat AI voor jouw organisatie kan betekenen?',
    discuss: 'We praten er graag over.',
    cta: 'Plan een gesprek →',
    privacy: 'Privacybeleid'
  }
};

export function whitepaperEmailHtml({ name, language = 'nl' }: WhitepaperEmailProps): string {
  const firstName = name.split(" ")[0];
  const t = translations[language as keyof typeof translations] || translations.nl;

  return `
<!DOCTYPE html>
<html lang="${t.lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${language === 'en' ? 'Your Nativ Whitepaper' : 'Je Nativ Whitepaper'}</title>
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
              <h1 style="margin:0 0 16px;font-size:26px;color:#4A4A48;font-weight:400;line-height:1.3;">
                ${t.greeting} ${firstName}${t.here}
              </h1>
              
              <p style="margin:0 0 20px;font-size:16px;color:#4A4A48;line-height:1.6;font-weight:300;">
                ${t.thanks}
              </p>

              <p style="margin:0 0 24px;font-size:18px;color:#4A4A48;font-style:italic;line-height:1.5;">
                &ldquo;${t.quote.replace(/"/g, '')}&rdquo;
              </p>

              <p style="margin:0 0 20px;font-size:16px;color:#4A4A48;line-height:1.6;font-weight:300;">
                ${t.discover}
              </p>

              <ul style="margin:0 0 24px;padding-left:20px;font-size:15px;color:#4A4A48;line-height:1.8;font-weight:300;">
                <li>${t.bullet1}</li>
                <li>${t.bullet2}</li>
                <li>${t.bullet3}</li>
                <li>${t.bullet4}</li>
              </ul>

              <p style="margin:0 0 8px;font-size:16px;color:#4A4A48;line-height:1.6;font-weight:300;">
                ${t.questions}
              </p>
              <p style="margin:0 0 32px;font-size:16px;color:#4A4A48;line-height:1.6;font-weight:300;">
                ${t.discuss}
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="border-radius:8px;background-color:#8B9A6B;">
                    <a href="https://gonativ.nl/contact" target="_blank" style="display:inline-block;padding:14px 32px;font-size:16px;color:#FFFFFF;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-weight:600;">
                      ${t.cta}
                    </a>
                  </td>
                </tr>
              </table>
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
                <a href="https://gonativ.nl/security" style="color:#8B9A6B;text-decoration:none;">${t.privacy}</a>
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
