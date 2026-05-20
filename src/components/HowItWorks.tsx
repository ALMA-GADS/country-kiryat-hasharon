"use client";

import { motion } from "framer-motion";
import { ClipboardText, PhoneCall, SwimmingPool } from "@phosphor-icons/react/dist/ssr";

const steps = [
  {
    num: "1",
    title: "ממלאים פרטים",
    desc: "שם, טלפון, מייל — שלוש שורות, פחות מדקה.",
    Icon: ClipboardText,
    color: "#15A6E0",
  },
  {
    num: "2",
    title: "נרשמים ליריד",
    desc: "נציג מהקאנטרי יחזור אליכם לתיאום קצר ויאשר את ההגעה ליריד.",
    Icon: PhoneCall,
    color: "#B4CB15",
  },
  {
    num: "3",
    title: "מתחילים לבלות",
    desc: "ביום היריד — בוחרים את המסלול, סוגרים את המנוי, ומתחילים את הקיץ.",
    Icon: SwimmingPool,
    color: "#15A6E0",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0D0D0D] to-[#0A0A0A]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 bg-[#15A6E0]/15 border border-[#15A6E0]/35 text-[#15A6E0] rounded-full px-4 py-1.5 text-xs font-bold font-[family-name:var(--font-heebo)] tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#15A6E0] animate-pulse" />
            ככה זה עובד
          </span>
          <h2 className="font-[family-name:var(--font-heebo)] font-black text-3xl sm:text-4xl md:text-5xl text-white">
            <span className="text-gradient-primary">3 שלבים</span> להתחיל את הקיץ
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative">
          <div className="hidden md:block absolute top-12 right-[16%] left-[16%] border-t-2 border-dashed border-white/10 -z-0" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative bg-gradient-to-br from-[#1A1A1A] to-[#111] border border-white/10 hover:border-white/20 transition-colors rounded-3xl p-7 text-center z-10"
            >
              <div className="flex justify-center mb-5">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center font-[family-name:var(--font-heebo)] font-black text-2xl text-white relative"
                  style={{
                    background: `linear-gradient(135deg, ${step.color}, ${step.color}AA)`,
                    boxShadow: `0 0 24px ${step.color}40`,
                  }}
                >
                  {step.num}
                </div>
              </div>
              <step.Icon
                size={28}
                weight="duotone"
                className="mx-auto mb-3 opacity-70"
                style={{ color: step.color }}
              />
              <h3 className="font-[family-name:var(--font-heebo)] font-bold text-xl text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
