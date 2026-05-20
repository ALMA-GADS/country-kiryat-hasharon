import { NextResponse } from "next/server";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body?.name || "").trim();
    const phone = String(body?.phone || "").replace(/[-\s]/g, "");
    const email = String(body?.email || "").trim();

    if (!name || !/^0\d{8,9}$/.test(phone)) {
      return NextResponse.json(
        { ok: false, error: "פרטים חסרים או לא תקינים" },
        { status: 400 }
      );
    }

    if (!isSupabaseConfigured || !supabaseAdmin) {
      console.warn("[checkout] Supabase not configured — lead not persisted", {
        name,
        phone,
        email,
      });
      return NextResponse.json({ ok: true, queued: true });
    }

    const { data, error } = await supabaseAdmin
      .from("leads")
      .insert({
        name,
        phone,
        email: email || null,
        source: "landing-summer-2026",
        status: "new",
      })
      .select("id")
      .single();

    if (error) {
      console.error("[checkout] supabase insert error", error);
      return NextResponse.json(
        { ok: false, error: "שמירה נכשלה" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err) {
    console.error("[checkout] error", err);
    return NextResponse.json(
      { ok: false, error: "שגיאה לא צפויה" },
      { status: 500 }
    );
  }
}
