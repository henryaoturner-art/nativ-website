import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";

const WHITEPAPER_AUDIENCE_ID = "b2df0faf-195b-4bdf-aa9e-75d78e3ff4b5";
const ADMIN_SECRET = process.env.LEADS_ADMIN_SECRET || "";

export async function GET(req: NextRequest) {
  // Simple auth: require secret in query param or Authorization header
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret") || req.headers.get("authorization")?.replace("Bearer ", "");

  if (!ADMIN_SECRET || secret !== ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "Resend not configured" }, { status: 500 });
    }

    const { data, error } = await resend.contacts.list({
      audienceId: WHITEPAPER_AUDIENCE_ID,
    });

    if (error) {
      console.error("Failed to fetch leads:", error);
      return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
    }

    return NextResponse.json({
      total: data?.data?.length || 0,
      leads: data?.data || [],
    });
  } catch (error) {
    console.error("Leads API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
