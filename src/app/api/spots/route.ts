import { NextResponse } from "next/server";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

const TOTAL_SPOTS = 80;

export async function GET() {
  if (!isSupabaseConfigured || !supabaseAdmin) {
    return NextResponse.json({ remaining: 23, total: TOTAL_SPOTS });
  }

  const { count } = await supabaseAdmin
    .from("leads")
    .select("id", { count: "exact", head: true })
    .eq("source", "landing-summer-2026");

  const taken = count || 0;
  const remaining = Math.max(0, TOTAL_SPOTS - taken);
  return NextResponse.json({ remaining, total: TOTAL_SPOTS });
}
