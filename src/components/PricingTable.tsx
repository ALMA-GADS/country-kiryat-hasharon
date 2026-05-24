"use client";

import { motion } from "framer-motion";
import { Check, Sparkle, Crown } from "@phosphor-icons/react/dist/ssr";

const regularFeatures = [
  "מחיר רגיל ללא ההטבה",
  "אותם מתקנים, אותם חוגים",
  "ללא בונוס יום היריד",
  "ללא קיבוע מחיר",
];

const vipFeatures = [
  "כניסה חופשית לבריכה ולמכון הכושר החדש",
  "כל חוגי הסטודיו ללא הגבלה",
  "בריכת פעוטות + הפעלות למשפחה",
  "סאונה ושימוש בכל המתקנים",
  "מחיר נעול לכל הקיץ — ללא העלאות",
  "פתוח גם בשבת",
];

export default function PricingTable() {
  const scrollToForm = () =>
    document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0D0D0D] to-[#0A0A0A]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#15A6E0]/8 rounded-full blur-[180px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 bg-[#B4CB15]/15 border border-[#B4CB15]/35 text-[#B4CB15] rounded-full px-4 py-1.5 text-xs font-bold font-[family-name:var(--font-heebo)] tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B4CB15] animate-pulse" />
            המחיר
          </span>
          <h2 className="font-[family-name:var(--font-heebo)] font-black text-3xl sm:text-4xl md:text-5xl text-white">
            רק ב-<span className="text-gradient-primary">27–28.5</span>: המחיר הכי טוב של הקיץ
          </h2>
          <p className="text-gray-400 mt-4">
            רוכשים מנוי עכשיו ונמנעים מעליית המחירים שנכנסת לתוקף
          </p>
          <div className="inline-block mt-5 px-5 py-2 bg-[#15A6E0]/10 border border-dashed border-[#15A6E0]/40 rounded-full text-sm font-[family-name:var(--font-heebo)] font-bold text-white">
            לדוגמה בלבד: זוג + 1 ילד · יתר המחירים יוצגו ביום היריד
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Regular */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-[#1A1A1A] to-[#111] border border-white/10 rounded-3xl p-7 sm:p-9 opacity-65"
          >
            <div className="text-gray-400 text-sm font-bold mb-3 font-[family-name:var(--font-heebo)] tracking-wide">
              מחיר רגיל
            </div>
            <div className="flex items-end gap-2 mb-1">
              <span className="font-[family-name:var(--font-heebo)] font-black text-5xl text-gray-400 line-through decoration-2 decoration-gray-600">
                3,500
              </span>
              <span className="text-gray-500 text-base mb-2">ש״ח</span>
            </div>
            <div className="text-gray-500 text-sm mb-7">לזוג + 1 ילד · מנוי קיץ</div>

            <ul className="space-y-3">
              {regularFeatures.map((f, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-gray-500 text-sm line-through decoration-gray-700"
                >
                  <Check size={16} weight="bold" className="shrink-0 text-gray-600" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-white/5">
              <button
                disabled
                className="w-full py-3 rounded-2xl bg-white/5 text-gray-500 font-[family-name:var(--font-heebo)] font-bold text-sm cursor-not-allowed"
              >
                מחיר רגיל — לא רלוונטי ב-27–28.5
              </button>
            </div>
          </motion.div>

          {/* VIP */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-[#1A1A1A] to-[#0E0E0E] border-2 border-[#15A6E0]/50 rounded-3xl p-7 sm:p-9 overflow-hidden cta-glow"
          >
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#15A6E0]/30 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#B4CB15]/15 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#15A6E0] to-[#0E80AE] rounded-full px-3 py-1">
                  <Crown size={14} weight="fill" className="text-white" />
                  <span className="text-white text-xs font-bold font-[family-name:var(--font-heebo)]">
                    מחיר יום היריד
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 bg-[#B4CB15]/15 border border-[#B4CB15]/40 rounded-full px-3 py-1">
                  <span className="text-[#B4CB15] text-xs font-bold font-[family-name:var(--font-heebo)]">
                    ללא התחייבות
                  </span>
                </div>
              </div>

              <div className="text-white text-sm font-bold mb-3 font-[family-name:var(--font-heebo)] tracking-wide">
                מנוי קיץ · זוג + 1 ילד
              </div>

              <div className="flex items-end gap-2 mb-1">
                <span className="font-[family-name:var(--font-heebo)] font-black text-6xl sm:text-7xl text-gradient-primary">
                  3,150
                </span>
                <span className="text-gray-300 text-base mb-3">ש״ח</span>
              </div>
              <div className="flex items-center gap-2 mb-7">
                <span className="text-gray-500 text-sm line-through">3,500 ש״ח</span>
                <span className="text-[#B4CB15] text-sm font-bold">חיסכון 350 ש״ח</span>
              </div>

              <ul className="space-y-3 mb-8">
                {vipFeatures.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-white/90 text-sm sm:text-base"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#B4CB15]/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} weight="bold" className="text-[#B4CB15]" />
                    </div>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-gradient-to-r from-[#15A6E0]/15 to-[#B4CB15]/15 border border-[#15A6E0]/30 rounded-2xl p-4 mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkle size={16} weight="fill" className="text-[#B4CB15]" />
                  <span className="text-white font-bold text-sm font-[family-name:var(--font-heebo)]">
                    בונוס יום היריד
                  </span>
                </div>
                <p className="text-white/80 text-xs sm:text-sm">
                  אזרחים ותיקים, זוגות והרכבים נוספים — מחיר מיוחד נוסף בעת ההרשמה ביום היריד.
                </p>
              </div>

              <motion.button
                onClick={scrollToForm}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[#15A6E0] to-[#0E80AE] hover:from-[#45BCE8] hover:to-[#15A6E0] text-white font-[family-name:var(--font-heebo)] font-bold text-base py-4 rounded-2xl transition-all duration-300 cursor-pointer"
              >
                אני רוצה את המחיר הזה
              </motion.button>
            </div>
          </motion.div>
        </div>

        <p className="text-center text-gray-500 text-xs sm:text-sm mt-6 italic">
          * יתר ההרכבים (יחיד · זוג · משפחה מורחבת) — המחירים יוצגו ביום היריד.
        </p>
      </div>
    </section>
  );
}
