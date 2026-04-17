import { NextRequest, NextResponse } from "next/server";

// Google Apps Script web-app URL (deployed as "Anyone" / "Execute as me")
const APPS_SCRIPT_URL = process.env.WHITEPAPER_WEBHOOK_URL;

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

    // Forward to Google Apps Script which handles:
    // 1. Logging lead to Google Sheet
    // 2. Sending PDF via email
    if (APPS_SCRIPT_URL) {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: body.name,
          email: body.email,
          company: body.company || "",
          role: body.role || "",
          timestamp: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        console.error("Apps Script error:", res.status, await res.text());
      }
    } else {
      // Fallback: log to console (Vercel logs) until webhook is configured
      console.log("WHITEPAPER_LEAD:", JSON.stringify(body));
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
