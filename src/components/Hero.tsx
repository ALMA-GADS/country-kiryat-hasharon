"use client";

import { motion } from "framer-motion";
import { CaretDown, ShieldCheck, CalendarBlank } from "@phosphor-icons/react/dist/ssr";
import Countdown from "./Countdown";

const TARGET_DATE = "2026-06-10T21:00:00+03:00";

export default function Hero() {
  const scrollToForm = () => {
    document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with dark gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero.png"
          alt="קאנטרי קריית השרון — בריכה ומתחם הספורט"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.35]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-[#0A0A0A]/40 to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/40" />
      </div>

      {/* Brand glows */}
      <div className="absolute top-1/4 right-[-10%] w-[600px] h-[600px] bg-[#15A6E0]/15 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[-10%] w-[500px] h-[500px] bg-[#FFD700]/8 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 sm:py-20">
        <div className="text-center">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-[family-name:var(--font-heebo)] font-black tracking-tight mb-4"
          >
            <span className="block text-white/80 text-2xl sm:text-3xl md:text-4xl mb-1">
              מבצע של פעם בחיים
            </span>
            <span
              className="block leading-[0.85] my-1"
              style={{
                color: "#FFD700",
                textShadow: "0 0 80px rgba(255,210,0,0.5), 0 4px 24px rgba(200,140,0,0.35)",
              }}
            >
              <span className="text-[82px] sm:text-[112px] md:text-[144px] lg:text-[176px]">
                999 ₪
              </span>
            </span>
            <span className="block text-white text-3xl sm:text-4xl md:text-5xl mt-1">
              למנוי קיץ!
            </span>
            <span className="block text-white/60 text-xl sm:text-2xl md:text-3xl mt-1">
              בקאנטרי קריית השרון
            </span>
          </motion.h1>

          {/* Lede */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-7 leading-relaxed"
          >
            <span className="text-white font-bold">יום רביעי הקרוב</span>
            {" "}<span className="text-gray-500">|</span>{" "}
            <span className="text-[#FFD700] font-bold">10.6.26</span>
            {" "}<span className="text-gray-500">|</span>{" "}
            הפנינג מכירות של מנוי 999 ש״ח
            {" "}<span className="text-gray-500">|</span>{" "}
            <span className="text-white font-bold">מספר המקומות מוגבל</span>
            {" "}<span className="text-gray-500">|</span>{" "}
            רואים אותך אצלנו?
          </motion.p>

          {/* Date strip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="inline-flex items-center gap-3 bg-white/[0.04] border border-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 mb-7"
          >
            <CalendarBlank size={20} weight="duotone" className="text-[#FFD700]" />
            <span className="text-white font-[family-name:var(--font-heebo)] font-bold text-sm sm:text-base">
              הפנינג מכירות ·{" "}
              <span className="text-[#FFD700] text-lg mx-1">10.6.26</span>
              · יום רביעי · עד 21:00
            </span>
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mb-8"
          >
            <Countdown targetDate={TARGET_DATE} />
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex justify-center"
          >
            <motion.button
              onClick={scrollToForm}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="relative group bg-gradient-to-r from-[#FFD700] to-[#F5A800] hover:from-[#FFE233] hover:to-[#FFD700] text-gray-900 font-[family-name:var(--font-heebo)] font-bold text-base sm:text-lg py-4 px-10 sm:px-12 rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden"
              style={{ boxShadow: "0 0 40px rgba(255,215,0,0.35)" }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <ShieldCheck size={20} weight="duotone" />
                תפסו מקום ביריד — 999 ₪ לקיץ
              </span>
              <div className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000" />
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <CaretDown size={24} weight="bold" className="text-white/40" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
