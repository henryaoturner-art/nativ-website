import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  console.warn("RESEND_API_KEY is not set — emails will not be sent.");
}

// Use dummy key for build if no real key is provided
const apiKey = process.env.RESEND_API_KEY || "re_dummy_build_key";
export const resend = new Resend(apiKey);
