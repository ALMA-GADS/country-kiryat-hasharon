"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Timer, ArrowLeft } from "@phosphor-icons/react/dist/ssr";

const HOURS_PER_VISIT = 2.5;
const WEEKS_IN_SUMMER = 13;

export default function SavingsCalculator() {
  const [visitsPerWeek, setVisitsPerWeek] = useState(3);
  const totalVisits = visitsPerWeek * WEEKS_IN_SUMMER;
  const totalHours = Math.round(totalVisits * HOURS_PER_VISIT);

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0D0D0D] to-[#0A0A0A]" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#B4CB15]/8 rounded-full blur-[180px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 bg-[#B4CB15]/15 border border-[#B4CB15]/35 text-[#B4CB15] rounded-full px-4 py-1.5 text-xs font-bold font-[family-name:var(--font-heebo)] tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B4CB15] animate-pulse" />
            מחשבון בילוי משפחתי
          </span>
          <h2 className="font-[family-name:var(--font-heebo)] font-black text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
            תזיזו את הסליידר וראו כמה <br />
            <span className="text-gradient-primary">שעות בילוי משפחתי</span> מחכות לכם
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#1A1A1A] to-[#111] border border-white/10 rounded-3xl p-7 sm:p-10"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400 text-sm font-[family-name:var(--font-heebo)] font-bold">
              כמה פעמים בשבוע אתם מתכננים להגיע?
            </span>
            <span className="font-[family-name:var(--font-heebo)] font-black text-2xl text-white counter-number">
              {visitsPerWeek} {visitsPerWeek === 1 ? "ביקור" : "ביקורים"}
            </span>
          </div>

          <input
            type="range"
            min={1}
            max={7}
            step={1}
            value={visitsPerWeek}
            onChange={(e) => setVisitsPerWeek(Number(e.target.value))}
            className="brand-slider w-full mb-2"
          />
          <div
            className="flex justify-between text-xs text-gray-500 mb-8"
            dir="ltr"
          >
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="text-gray-400 text-xs mb-2 font-[family-name:var(--font-heebo)]">
                ביקורים לכל הקיץ
              </div>
              <div className="font-[family-name:var(--font-heebo)] font-black text-3xl text-white counter-number">
                {totalVisits} <span className="text-base text-gray-400">ימי הנאה</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#15A6E0]/15 to-[#B4CB15]/15 border border-[#15A6E0]/40 rounded-2xl p-5">
              <div className="text-white text-xs mb-2 font-[family-name:var(--font-heebo)] flex items-center gap-1.5">
                <Timer size={14} weight="duotone" className="text-[#B4CB15]" />
                שעות בילוי משפחתי
              </div>
              <div className="font-[family-name:var(--font-heebo)] font-black text-3xl text-gradient-primary counter-number">
                {totalHours} <span className="text-base text-white/80">שעות בקיץ</span>
              </div>
            </div>
          </div>

          <motion.button
            onClick={() =>
              document
                .getElementById("checkout")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="cta-glow w-full bg-gradient-to-r from-[#15A6E0] to-[#0E80AE] hover:from-[#45BCE8] hover:to-[#15A6E0] text-white font-[family-name:var(--font-heebo)] font-bold text-base sm:text-lg py-4 px-8 rounded-2xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
          >
            אני רוצה {totalHours} שעות בילוי משפחתי
            <ArrowLeft size={20} weight="bold" />
          </motion.button>

          <p className="text-center text-gray-500 text-xs mt-4">
            * בהנחה של כשעתיים וחצי לביקור · קיץ של 13 שבועות
          </p>
        </motion.div>
      </div>
    </section>
  );
}
