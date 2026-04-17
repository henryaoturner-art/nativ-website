/**
 * Branded HTML email template for white paper delivery.
 * Matches Nativ brand: sage (#8B9A6B), cream (#F2EDE4), grey (#4A4A48).
 */

interface WhitepaperEmailProps {
  name: string;
}

export function whitepaperEmailHtml({ name }: WhitepaperEmailProps): string {
  const firstName = name.split(" ")[0];

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Nativ White Paper</title>
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
                Hi ${firstName}, here's your white paper
              </h1>
              
              <p style="margin:0 0 20px;font-size:16px;color:#4A4A48;line-height:1.6;font-weight:300;">
                Thank you for your interest in Nativ. Attached to this email you'll find our white paper:
              </p>

              <p style="margin:0 0 24px;font-size:18px;color:#4A4A48;font-style:italic;line-height:1.5;">
                "It's in your head — Why the biggest obstacle for AI in your company isn't technology, it's context."
              </p>

              <p style="margin:0 0 20px;font-size:16px;color:#4A4A48;line-height:1.6;font-weight:300;">
                In this paper, you'll discover:
              </p>

              <ul style="margin:0 0 24px;padding-left:20px;font-size:15px;color:#4A4A48;line-height:1.8;font-weight:300;">
                <li>Why 80% of AI projects fail — and it's not the model</li>
                <li>The MVC™ Framework: 10 context blocks for AI agent tasks</li>
                <li>From tacit knowledge to structured, actionable context</li>
                <li>A practical implementation roadmap</li>
              </ul>

              <p style="margin:0 0 32px;font-size:16px;color:#4A4A48;line-height:1.6;font-weight:300;">
                Have questions or want to explore what AI can do for your organization? We'd love to chat.
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="border-radius:8px;background-color:#8B9A6B;">
                    <a href="https://gonativ.nl/contact" target="_blank" style="display:inline-block;padding:14px 32px;font-size:16px;color:#FFFFFF;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-weight:600;">
                      Plan a conversation →
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
                © 2026 Nativ B.V. · Amsterdam, NL
              </p>
              <p style="margin:0;font-size:13px;color:#4A4A48;opacity:0.4;font-family:Arial,Helvetica,sans-serif;">
                <a href="https://gonativ.nl" style="color:#8B9A6B;text-decoration:none;">gonativ.nl</a>
                 · 
                <a href="https://gonativ.nl/security" style="color:#8B9A6B;text-decoration:none;">Privacy Policy</a>
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
