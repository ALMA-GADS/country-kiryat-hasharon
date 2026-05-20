"use client";

import { motion } from "framer-motion";
import { Coins, SwimmingPool, CalendarBlank } from "@phosphor-icons/react/dist/ssr";

const questions = [
  {
    Icon: Coins,
    text: "האם הגיוני לחכות שבוע נוסף ולשלם יותר על אותו מנוי בדיוק?",
    accent: "#15A6E0",
  },
  {
    Icon: SwimmingPool,
    text: "האם תרצו לסיים עוד קיץ ולגלות שכל השכונה נהנתה — חוץ מכם?",
    accent: "#B4CB15",
  },
  {
    Icon: CalendarBlank,
    text: "האם נכון להחמיץ הטבה חד-פעמית בגלל היסוס של דקה אחת?",
    accent: "#15A6E0",
  },
];

export default function VossBlock() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0D0D0D] to-[#0A0A0A]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-[#B4CB15]/15 border border-[#B4CB15]/35 text-[#B4CB15] rounded-full px-4 py-1.5 text-xs font-bold font-[family-name:var(--font-heebo)] tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B4CB15] animate-pulse" />
            רגע לפני שאתם ממשיכים
          </span>
          <h2 className="font-[family-name:var(--font-heebo)] font-black text-3xl sm:text-4xl md:text-5xl leading-tight text-white">
            שלוש שאלות <span className="text-gradient-primary">קצרות</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {questions.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="group bg-gradient-to-br from-[#1A1A1A] to-[#111] border border-white/10 rounded-3xl p-6 sm:p-7 flex items-start gap-5 transition-all duration-300 hover:-translate-x-1"
              style={{ ["--hover-border" as string]: `${q.accent}60` }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${q.accent}60`)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}
            >
              <div
                className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-300"
                style={{
                  background: `${q.accent}15`,
                  border: `1px solid ${q.accent}40`,
                }}
              >
                <q.Icon
                  size={28}
                  weight="duotone"
                  style={{ color: q.accent }}
                />
              </div>
              <p className="flex-1 font-[family-name:var(--font-heebo)] font-bold text-lg sm:text-xl md:text-2xl text-white leading-snug">
                {q.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-400 mt-10 text-base"
        >
          אם עניתם <span className="text-[#B4CB15] font-bold">״לא״</span> אפילו על אחת
          מהן — המקום שלכם כבר מחכה.
        </motion.p>
      </div>
    </section>
  );
}
