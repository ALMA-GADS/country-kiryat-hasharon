import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { sendLeadEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body?.name || "").trim();
    const phone = String(body?.phone || "").replace(/[-\s]/g, "");
    const email = String(body?.email || "").trim();
    const source = String(body?.source || "landing-summer-2026").trim();

    if (!name || !/^0\d{8,9}$/.test(phone)) {
      return NextResponse.json(
        { ok: false, error: "פרטים חסרים או לא תקינים" },
        { status: 400 }
      );
    }

    if (!isSupabaseConfigured || !supabase) {
      console.warn("[checkout] Supabase not configured — lead not persisted", {
        name,
        phone,
        email,
        source,
      });
    } else {
      // Insert without returning the row — anon role has no SELECT grant.
      const { error } = await supabase
        .from("leads")
        .insert({
          name,
          phone,
          email: email || null,
          source,
          status: "new",
        });

      if (error) {
        console.error("[checkout] supabase insert error", error);
        return NextResponse.json(
          { ok: false, error: "שמירה נכשלה" },
          { status: 500 }
        );
      }
    }

    // Fire-and-forget email notification — never block the user response on this.
    sendLeadEmail({ name, phone, email, source }).catch((err) =>
      console.error("[checkout] email send failed", err)
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[checkout] error", err);
    return NextResponse.json(
      { ok: false, error: "שגיאה לא צפויה" },
      { status: 500 }
    );
  }
}
