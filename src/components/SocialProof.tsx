"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { CalendarCheck, UsersThree, Barbell } from "@phosphor-icons/react/dist/ssr";

type Stat = {
  Icon: typeof CalendarCheck;
  value: number;
  suffix: string;
  display?: string;
  label: string;
  sub: string;
  accent: string;
};

const stats: Stat[] = [
  {
    Icon: CalendarCheck,
    value: 15,
    suffix: "+",
    label: "שנים של פעילות בשכונה",
    sub: "מאז 2010 — חלק מהקהילה",
    accent: "#15A6E0",
  },
  {
    Icon: UsersThree,
    value: 1300,
    suffix: "+",
    label: "מנויים פעילים",
    sub: "משפחות שבחרו בנו לאורך השנים",
    accent: "#B4CB15",
  },
  {
    Icon: Barbell,
    value: 0,
    suffix: "",
    display: "חדש!",
    label: "מכון כושר חדש ומשופץ",
    sub: "ציוד חדיש · מרחב נעים · מאמנים מקצועיים",
    accent: "#15A6E0",
  },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const progress = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setN(Math.floor(value * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setN(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="counter-number">
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function SocialProof() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0D0D0D] to-[#0A0A0A]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#15A6E0]/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 bg-[#15A6E0]/15 border border-[#15A6E0]/35 text-[#15A6E0] rounded-full px-4 py-1.5 text-xs font-bold font-[family-name:var(--font-heebo)] tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#15A6E0] animate-pulse" />
            למה אנחנו
          </span>
          <h2 className="font-[family-name:var(--font-heebo)] font-black text-3xl sm:text-4xl md:text-5xl text-white">
            הקאנטרי של <span className="text-gradient-primary">קריית השרון</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-lift bg-gradient-to-br from-[#1A1A1A] to-[#111] border border-white/10 rounded-3xl p-8 text-center hover:border-white/20 transition-colors"
            >
              <div
                className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center"
                style={{
                  background: `${s.accent}20`,
                  border: `1px solid ${s.accent}40`,
                }}
              >
                <s.Icon size={28} weight="duotone" style={{ color: s.accent }} />
              </div>
              <div className="font-[family-name:var(--font-heebo)] font-black text-white mb-2 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                {s.display ? (
                  <span className="text-3xl sm:text-4xl">{s.display}</span>
                ) : (
                  <span className="text-4xl sm:text-5xl">
                    <Counter value={s.value} suffix={s.suffix} />
                  </span>
                )}
              </div>
              <div className="text-white font-semibold text-base mb-1">{s.label}</div>
              <div className="text-gray-500 text-sm">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
