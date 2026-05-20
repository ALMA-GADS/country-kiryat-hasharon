"use client";

import { motion } from "framer-motion";
import { Check, X, Question, CaretLeft } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useRef } from "react";

type CellValue = "yes" | "no" | "maybe";

const rows: { feature: string; values: Record<string, CellValue> }[] = [
  {
    feature: "בריכה חצי אולימפית מקורה ומחוממת",
    values: { us: "yes", studio: "no", park: "no", country: "yes" },
  },
  {
    feature: "בריכת פעוטות גדולה",
    values: { us: "yes", studio: "no", park: "no", country: "maybe" },
  },
  {
    feature: "מכון כושר חדש ומשופץ",
    values: { us: "yes", studio: "maybe", park: "no", country: "maybe" },
  },
  {
    feature: "פתוח גם בשבת",
    values: { us: "yes", studio: "no", park: "yes", country: "no" },
  },
  {
    feature: "סאונה יבשה",
    values: { us: "yes", studio: "no", park: "no", country: "maybe" },
  },
  {
    feature: "חוגי סטודיו מגוונים",
    values: { us: "yes", studio: "yes", park: "no", country: "yes" },
  },
  {
    feature: "אווירה משפחתית, יחס אישי",
    values: { us: "yes", studio: "maybe", park: "no", country: "no" },
  },
];

const columns: { key: string; label: string; highlight: boolean }[] = [
  { key: "us", label: "קאנטרי קריית השרון", highlight: true },
  { key: "studio", label: "סטודיו שכונתי", highlight: false },
  { key: "park", label: "פארק / בית", highlight: false },
  { key: "country", label: "קאנטרי אחר", highlight: false },
];

function Cell({ v }: { v: CellValue }) {
  if (v === "yes")
    return <Check size={20} weight="bold" className="text-[#B4CB15] mx-auto" />;
  if (v === "no")
    return <X size={20} weight="bold" className="text-gray-600 mx-auto" />;
  return <Question size={20} weight="bold" className="text-gray-500 mx-auto" />;
}

export default function ComparisonTable() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (window.innerWidth >= 768) return;
    const t = setTimeout(() => {
      el.scrollTo({ left: 80, behavior: "smooth" });
      setTimeout(() => el.scrollTo({ left: 0, behavior: "smooth" }), 900);
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0D0D0D] to-[#0A0A0A]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-[#15A6E0]/15 border border-[#15A6E0]/35 text-[#15A6E0] rounded-full px-4 py-1.5 text-xs font-bold font-[family-name:var(--font-heebo)] tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#15A6E0] animate-pulse" />
            למה דווקא כאן
          </span>
          <h2 className="font-[family-name:var(--font-heebo)] font-black text-3xl sm:text-4xl md:text-5xl text-white">
            <span className="text-gradient-primary">אנחנו</span> מול האלטרנטיבות
          </h2>
        </motion.div>

        <div className="relative">
          <div className="md:hidden absolute top-1/2 left-1 -translate-y-1/2 z-10 animate-scroll-hint pointer-events-none">
            <CaretLeft size={24} weight="bold" className="text-[#15A6E0]" />
          </div>

          <div ref={scrollRef} className="overflow-x-auto md:overflow-visible -mx-6 px-6">
            <div className="min-w-[640px] md:min-w-0">
              <div className="grid grid-cols-[1.4fr_repeat(4,1fr)] gap-0 rounded-2xl overflow-hidden border border-white/10 bg-[#0F0F0F]">
                <div className="bg-[#141414] p-4 text-sm text-gray-400 font-[family-name:var(--font-heebo)]">
                  &nbsp;
                </div>
                {columns.map((c) => (
                  <div
                    key={c.key}
                    className={`p-4 text-center text-xs sm:text-sm font-[family-name:var(--font-heebo)] font-bold ${
                      c.highlight
                        ? "bg-gradient-to-b from-[#15A6E0]/30 to-[#15A6E0]/10 text-white border-x border-[#15A6E0]/40"
                        : "bg-[#141414] text-gray-400"
                    }`}
                  >
                    {c.label}
                  </div>
                ))}

                {rows.map((row, ri) => (
                  <div key={ri} className="contents">
                    <div
                      className={`p-4 text-sm sm:text-base text-white border-t border-white/5 font-[family-name:var(--font-assistant)] ${
                        ri % 2 === 1 ? "bg-white/[0.02]" : ""
                      }`}
                    >
                      {row.feature}
                    </div>
                    {columns.map((c) => (
                      <div
                        key={c.key}
                        className={`p-4 border-t border-white/5 flex items-center justify-center ${
                          c.highlight
                            ? "bg-[#15A6E0]/10 border-x border-[#15A6E0]/30"
                            : ri % 2 === 1
                            ? "bg-white/[0.02]"
                            : ""
                        }`}
                      >
                        <Cell v={row.values[c.key]} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 text-xs sm:text-sm mt-6 font-[family-name:var(--font-heebo)] md:hidden">
          ← גללו ימינה לראות את הטבלה המלאה
        </p>
      </div>
    </section>
  );
}
