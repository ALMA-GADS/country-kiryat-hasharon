import { NextResponse } from "next/server";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

// Returns recent leads for FOMO notifications.
// First name only — full PII never leaves the server.
export async function GET() {
  if (!isSupabaseConfigured || !supabaseAdmin) {
    return NextResponse.json({ leads: [] });
  }

  const since = new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString();
  const { data, error } = await supabaseAdmin
    .from("leads")
    .select("name, created_at")
    .gte("created_at", since)
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    return NextResponse.json({ leads: [] });
  }

  const leads = (data || []).map((l) => ({
    firstName: String(l.name || "").split(" ")[0] || "אחד מהשכנים",
    minutesAgo: Math.max(
      1,
      Math.floor((Date.now() - new Date(l.created_at).getTime()) / 60000)
    ),
  }));

  return NextResponse.json({ leads });
}
