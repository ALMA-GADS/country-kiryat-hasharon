import { NextResponse } from "next/server";
import { isEmailConfigured, sendLeadEmail } from "@/lib/email";
import { isSupabaseConfigured } from "@/lib/supabase";

// Debug-only endpoint — returns email config status and optionally sends a test
// Remove or gate behind a secret before going public.
export async function GET() {
  const resendApiKeySet = Boolean(process.env.RESEND_API_KEY);
  const notifyEmailSet = Boolean(process.env.LEAD_NOTIFICATION_EMAIL);
  const fromEmailSet = Boolean(process.env.LEAD_FROM_EMAIL);

  const config = {
    supabaseConfigured: isSupabaseConfigured,
    emailConfigured: isEmailConfigured,
    resendApiKeySet,
    notifyEmailSet,
    fromEmailSet,
    notifyEmail: notifyEmailSet ? process.env.LEAD_NOTIFICATION_EMAIL : null,
    fromEmail: fromEmailSet ? process.env.LEAD_FROM_EMAIL : null,
  };

  return NextResponse.json(config);
}

export async function POST() {
  const result = await sendLeadEmail({
    name: "Test — Claude Debug",
    phone: "0500000000",
    email: process.env.LEAD_NOTIFICATION_EMAIL || "",
    source: "test-email-endpoint",
  });

  return NextResponse.json({
    isEmailConfigured,
    resendApiKeySet: Boolean(process.env.RESEND_API_KEY),
    notifyEmailSet: Boolean(process.env.LEAD_NOTIFICATION_EMAIL),
    result,
  });
}
