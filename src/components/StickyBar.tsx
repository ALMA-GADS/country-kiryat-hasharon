"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkle } from "@phosphor-icons/react/dist/ssr";

export default function StickyBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handle = () => setShow(window.scrollY > window.innerHeight * 0.8);
    handle();
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const scrollToForm = () =>
    document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth" });

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/10"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="hidden sm:flex shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-[#15A6E0] to-[#B4CB15] items-center justify-center">
                <Sparkle size={18} weight="fill" className="text-white" />
              </div>
              <div className="min-w-0">
                <div className="text-white text-xs sm:text-sm font-[family-name:var(--font-heebo)] font-bold truncate">
                  הפנינג מכירות 999 ₪ — יום רביעי · 10.6.26 · עד 21:00
                </div>
                <div className="text-gray-400 text-[11px] sm:text-xs truncate">
                  999 ₪ לקיץ · 249 ₪/חודש אח״כ · ביטול ב-30 יום
                </div>
              </div>
            </div>
            <motion.button
              onClick={scrollToForm}
              whileTap={{ scale: 0.95 }}
              className="shrink-0 bg-gradient-to-r from-[#15A6E0] to-[#0E80AE] hover:from-[#45BCE8] hover:to-[#15A6E0] text-white font-[family-name:var(--font-heebo)] font-bold text-xs sm:text-sm py-2 px-4 sm:px-5 rounded-xl transition-all duration-300"
            >
              תפסו מקום
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
