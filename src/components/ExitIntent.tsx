"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, X, CircleNotch, CheckCircle } from "@phosphor-icons/react/dist/ssr";

export default function ExitIntent() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (dismissed) return;
    let armed = false;
    const armTimer = setTimeout(() => (armed = true), 10000);
    const handleLeave = (e: MouseEvent) => {
      if (!armed) return;
      if (e.clientY <= 0) setShow(true);
    };
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      clearTimeout(armTimer);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [dismissed]);

  const close = () => {
    setShow(false);
    setDismissed(true);
  };

  const submit = async () => {
    if (!name.trim() || !/^0\d{8,9}$/.test(phone.replace(/[-\s]/g, ""))) {
      setError("נא למלא שם ומספר תקין");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email: "", source: "exit-intent" }),
      });
      setDone(true);
      setTimeout(close, 3000);
    } catch {
      setError("נסו שוב בעוד רגע");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={close}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-white/10 rounded-[28px] max-w-md w-full p-7 sm:p-9"
          >
            <button
              onClick={close}
              aria-label="סגירה"
              className="absolute top-4 left-4 text-gray-500 hover:text-white p-1 transition-colors"
            >
              <X size={20} weight="bold" />
            </button>

            {!done ? (
              <>
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#15A6E0] to-[#B4CB15] mb-4">
                    <Gift size={34} weight="duotone" className="text-white" />
                  </div>
                  <h3 className="font-[family-name:var(--font-heebo)] font-black text-2xl text-white mb-2">
                    רגע, אל תלכו עוד
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    השאירו טלפון, נתקשר אליכם תוך 24 שעות
                    <br />
                    ונשמור לכם את מחיר היריד — גם אם לא תשלימו הרשמה היום.
                  </p>
                </div>

                <div className="space-y-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="שם מלא"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#15A6E0]/60 focus:outline-none rounded-2xl py-3 px-4 text-white placeholder-gray-600"
                  />
                  <input
                    type="tel"
                    dir="ltr"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="050-1234567"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#15A6E0]/60 focus:outline-none rounded-2xl py-3 px-4 text-white placeholder-gray-600"
                  />
                  {error && (
                    <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">
                      {error}
                    </div>
                  )}
                  <button
                    onClick={submit}
                    disabled={loading}
                    className="cta-glow w-full bg-gradient-to-r from-[#15A6E0] to-[#0E80AE] hover:from-[#45BCE8] hover:to-[#15A6E0] disabled:opacity-70 text-white font-[family-name:var(--font-heebo)] font-bold py-3.5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <CircleNotch size={20} weight="bold" className="animate-spin" />
                    ) : (
                      "שמרו לי את המחיר"
                    )}
                  </button>
                  <p className="text-center text-xs text-gray-600 mt-2">
                    לא חוייבתם בכלום. רק טלפון, רק בקשת מידע.
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <CheckCircle size={56} weight="duotone" className="text-[#B4CB15] mx-auto mb-3" />
                <h3 className="font-[family-name:var(--font-heebo)] font-black text-xl text-white mb-2">
                  קיבלנו! נחזור אליכם
                </h3>
                <p className="text-gray-400 text-sm">תוך 24 שעות</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
