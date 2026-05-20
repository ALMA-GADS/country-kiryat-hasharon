"use client";

import { motion } from "framer-motion";
import { Quotes, Star } from "@phosphor-icons/react/dist/ssr";

const testimonials = [
  {
    text: "אחרי שנים שניסיתי כל מיני מקומות, פה הילדים שלי מבקשים לבוא כל בוקר. הצוות מכיר את כולם בשם, האווירה משפחתית באמת — לא רק בסיסמא.",
    name: "מיכל ק.",
    role: "מנויה 4 שנים, אמא לשניים",
    color: "#15A6E0",
  },
  {
    text: "השחייה בבוקר לפני העבודה הפכה למקום הכי שקט שיש לי ביום. הבריכה מקורה ומחוממת, אין תירוצים בחורף, ואני יוצא רגוע לעבודה.",
    name: "אבי מ.",
    role: "מנוי 6 שנים",
    color: "#B4CB15",
  },
  {
    text: "מכון הכושר הכי לא מאיים שהייתי בו. אני לא ספורטאית, ופה הרגשתי בנוח מהיום הראשון. המאמנים סבלניים, הציוד נקי, אין דחיפות.",
    name: "ליאת ב.",
    role: "מנויה שנתיים",
    color: "#15A6E0",
  },
  {
    text: "הילד שלי בן 5 התחיל חוג שחייה פה, ואני נשארתי לאימון בחדר הכושר. שעה אחת — שנינו מרוצים. זה משנה לגמרי את היום.",
    name: "תמר ש.",
    role: "מנויה שנה",
    color: "#B4CB15",
  },
  {
    text: "פתוח בשבת. זה נשמע פיצ׳ר קטן עד שאתה מבין שזה היחיד באזור. כל המשפחה באים, אוכלים בקפיטריה, נחים ליד הבריכה. מה אפשר לבקש יותר.",
    name: "רונן א.",
    role: "מנוי 3 שנים",
    color: "#15A6E0",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0D0D0D] to-[#0A0A0A]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#B4CB15]/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 bg-[#B4CB15]/15 border border-[#B4CB15]/35 text-[#B4CB15] rounded-full px-4 py-1.5 text-xs font-bold font-[family-name:var(--font-heebo)] tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B4CB15] animate-pulse" />
            המנויים שלנו מספרים
          </span>
          <h2 className="font-[family-name:var(--font-heebo)] font-black text-3xl sm:text-4xl md:text-5xl text-white">
            <span className="text-gradient-primary">1,300+</span> מנויים פעילים
          </h2>
          <p className="text-gray-400 mt-3">לא ביקשנו מהם להגיד את זה</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`relative bg-gradient-to-br from-[#1A1A1A] to-[#111] border border-white/10 hover:border-white/20 transition-colors rounded-3xl p-7 ${
                i === 1 ? "lg:translate-y-8" : ""
              } ${i === 3 ? "lg:translate-y-[-16px]" : ""}`}
            >
              <Quotes
                size={28}
                weight="fill"
                className="mb-4 opacity-60"
                style={{ color: t.color }}
              />
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} size={16} weight="fill" style={{ color: t.color }} />
                ))}
              </div>
              <p className="text-white/85 text-sm sm:text-base leading-relaxed mb-6">
                {t.text}
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-[family-name:var(--font-heebo)] font-bold text-white"
                  style={{
                    background: `linear-gradient(135deg, ${t.color}, ${t.color}80)`,
                  }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-gray-500 text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
