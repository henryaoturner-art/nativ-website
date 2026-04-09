/**
 * Google Apps Script — Nativ Whitepaper Lead Capture
 * 
 * SETUP:
 * 1. Create a Google Sheet called "Nativ Whitepaper Leads"
 * 2. Add headers in row 1: Timestamp | Name | Email | Company | Role | LinkedIn
 * 3. Open Extensions > Apps Script
 * 4. Paste this code
 * 5. Replace SHEET_ID and PDF_URL below
 * 6. Deploy > New deployment > Web app > "Anyone" can access > Deploy
 * 7. Copy the web app URL → set as WHITEPAPER_WEBHOOK_URL env var in Vercel
 */

const SHEET_ID = "YOUR_SHEET_ID_HERE"; // Replace with actual sheet ID
const PDF_URL = "YOUR_PDF_DRIVE_URL_HERE"; // Public Drive link to Part 2 PDF

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // 1. Log to sheet
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name,
      data.email,
      data.company,
      data.role,
      data.linkedin,
    ]);
    
    // 2. Send email with PDF
    const subject = "Your White Paper: Context Engineering — Nativ";
    const htmlBody = `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #2D2D2D;">
        <div style="padding: 32px 0; border-bottom: 3px solid #6B8F71;">
          <span style="font-size: 14px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: #6B8F71;">Nativ</span>
        </div>
        <div style="padding: 32px 0;">
          <p style="font-size: 18px; margin-bottom: 16px;">Hi ${data.name},</p>
          <p style="line-height: 1.6; margin-bottom: 16px;">
            Thank you for your interest in our research on Context Engineering.
          </p>
          <p style="line-height: 1.6; margin-bottom: 24px;">
            Here is the complete white paper, including the full methodology, elicitation methods, 
            implementation roadmap, and all references:
          </p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${PDF_URL}" 
               style="display: inline-block; background: #6B8F71; color: white; padding: 14px 32px; 
                      border-radius: 8px; text-decoration: none; font-weight: 500; font-size: 16px;">
              Download White Paper (PDF) →
            </a>
          </div>
          <p style="line-height: 1.6; margin-bottom: 16px;">
            Want to see what Context Engineering could look like in your organization? 
            Our AI Opportunity Scan gives you a concrete analysis in one week.
          </p>
          <p style="line-height: 1.6;">
            <a href="https://gonativ.nl/scan" style="color: #4A6B4F;">Learn more about the AI Opportunity Scan →</a>
          </p>
          <p style="line-height: 1.6; margin-top: 24px;">
            Best,<br>
            The Nativ Team
          </p>
        </div>
        <div style="padding: 24px 0; border-top: 1px solid #E0DDD8; font-size: 13px; color: #999;">
          <p>Nativ B.V. · <a href="https://gonativ.nl" style="color: #6B8F71;">gonativ.nl</a> · <a href="mailto:info@gonativ.nl" style="color: #6B8F71;">info@gonativ.nl</a></p>
        </div>
      </div>
    `;
    
    GmailApp.sendEmail(data.email, subject, 
      `Hi ${data.name}, here is your white paper: ${PDF_URL}`, 
      { htmlBody: htmlBody, name: "Nativ", replyTo: "info@gonativ.nl" }
    );
    
    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ error: err.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput("Whitepaper webhook is live.");
}
