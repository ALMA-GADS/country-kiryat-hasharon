"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Check } from "@phosphor-icons/react/dist/ssr";

const guarantees = [
  "מנוי מקוצר",
  "ללא התחייבות שנתית",
  "אין דמי הרשמה נסתרים",
];

export default function RiskReversal() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0D0D0D] to-[#0A0A0A]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-[#15A6E0] to-[#0E80AE] rounded-[32px] p-10 sm:p-14 overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.4) 1.2px, transparent 1.2px)",
              backgroundSize: "22px 22px",
            }}
          />

          <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full border-2 border-white/10 pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full border-2 border-white/10 pointer-events-none" />
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-32 h-32 rounded-full bg-[#B4CB15]/30 blur-3xl pointer-events-none" />

          <div className="relative text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/15 backdrop-blur-sm border border-white/25 mb-6"
            >
              <ShieldCheck size={42} weight="duotone" className="text-white" />
            </motion.div>

            <h2 className="font-[family-name:var(--font-heebo)] font-black text-3xl sm:text-4xl md:text-5xl text-white leading-tight mb-4">
              אפס סיכון.
              <br />
              <span className="text-[#B4CB15]">אפס חששות.</span> רק הזדמנות.
            </h2>

            <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              לא בטוחים? לא בא לכם להתחייב? אנחנו מבינים — לכן הכנו רשת ביטחון מלאה.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-2xl mx-auto">
              {guarantees.map((g, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex-1 bg-white/15 backdrop-blur-sm border border-white/25 rounded-2xl px-4 py-3 flex items-center justify-center gap-2"
                >
                  <Check size={16} weight="bold" className="text-[#B4CB15] shrink-0" />
                  <span className="text-white text-xs sm:text-sm font-[family-name:var(--font-heebo)] font-semibold">
                    {g}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
