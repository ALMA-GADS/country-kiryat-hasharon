"use client";

import { motion } from "framer-motion";
import { CaretDown, ShieldCheck, CalendarBlank } from "@phosphor-icons/react/dist/ssr";
import Countdown from "./Countdown";

const TARGET_DATE = "2026-05-28T23:59:00+03:00";

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
      <div className="absolute bottom-1/4 left-[-10%] w-[500px] h-[500px] bg-[#B4CB15]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 sm:py-20">
        <div className="text-center">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-[family-name:var(--font-heebo)] font-black leading-[0.92] tracking-tight mb-6"
          >
            <span className="block text-white text-4xl sm:text-5xl md:text-6xl">יריד</span>
            <span className="block text-gradient-primary text-6xl sm:text-7xl md:text-8xl lg:text-9xl my-2">
              המכירות
            </span>
            <span className="block text-white text-3xl sm:text-4xl md:text-5xl">של הקיץ</span>
          </motion.h1>

          {/* Lede */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-7 leading-relaxed"
          >
            מנוי קיץ בקאנטרי קריית השרון הכולל{" "}
            <span className="text-white font-semibold">בריכה חצי אולימפית</span>,
            כניסה ל<span className="text-white font-semibold">מכון הכושר החדש!</span> סאונה
            והפעלות לכל המשפחה.{" "}
            <span className="text-white font-semibold">פתוח גם בשבת.</span>
          </motion.p>

          {/* Date strip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="inline-flex items-center gap-3 bg-white/[0.04] border border-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 mb-7"
          >
            <CalendarBlank size={20} weight="duotone" className="text-[#15A6E0]" />
            <span className="text-white font-[family-name:var(--font-heebo)] font-bold text-sm sm:text-base">
              יריד המכירות:{" "}
              <span className="text-[#B4CB15] text-lg mx-1">27–28.5</span>
              · רביעי–חמישי
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
              className="cta-glow relative group bg-gradient-to-r from-[#15A6E0] to-[#0E80AE] hover:from-[#45BCE8] hover:to-[#15A6E0] text-white font-[family-name:var(--font-heebo)] font-bold text-base sm:text-lg py-4 px-10 sm:px-12 rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <ShieldCheck size={20} weight="duotone" />
                רק ביריד המכירות — הנחה משמעותית לרכישת המנוי
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
