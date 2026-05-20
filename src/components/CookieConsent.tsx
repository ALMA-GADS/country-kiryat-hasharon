"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "@phosphor-icons/react/dist/ssr";

const KEY = "ckh_cookie_consent";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  const remember = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(KEY, value);
    } catch {}
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 22 }}
          className="fixed bottom-4 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-[640px] z-40"
        >
          <div className="bg-[#0F0F0F]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-start gap-3 flex-1">
              <Cookie size={22} weight="duotone" className="text-[#B4CB15] shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                האתר משתמש בעוגיות כדי לשפר את החוויה. ההסכמה לא חובה אך עוזרת
                לנו להבין מה עובד.
              </p>
            </div>
            <div className="flex gap-2 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => remember("declined")}
                className="flex-1 sm:flex-initial px-4 py-2 text-xs sm:text-sm text-gray-400 hover:text-white border border-white/10 hover:border-white/20 rounded-xl font-[family-name:var(--font-heebo)] transition-colors"
              >
                לא מסכים
              </button>
              <button
                onClick={() => remember("accepted")}
                className="flex-1 sm:flex-initial px-4 py-2 text-xs sm:text-sm text-white bg-gradient-to-r from-[#15A6E0] to-[#0E80AE] rounded-xl font-[family-name:var(--font-heebo)] font-bold"
              >
                מסכים
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
