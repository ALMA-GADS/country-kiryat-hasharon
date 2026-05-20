import { NextResponse } from "next/server";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const id = body?.id;
    const status = String(body?.status || "").trim();

    if (!id || !["new", "contacted", "paid", "lost"].includes(status)) {
      return NextResponse.json(
        { ok: false, error: "פרטים לא תקינים" },
        { status: 400 }
      );
    }

    if (!isSupabaseConfigured || !supabaseAdmin) {
      return NextResponse.json({ ok: true, queued: true });
    }

    const { error } = await supabaseAdmin
      .from("leads")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { ok: false, error: "עדכון נכשל" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "שגיאה לא צפויה" },
      { status: 500 }
    );
  }
}
