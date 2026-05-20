"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PersonSimpleCircle, TextT, Link as LinkIcon, X } from "@phosphor-icons/react/dist/ssr";

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [contrast, setContrast] = useState(false);
  const [linkHL, setLinkHL] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("accessibility-high-contrast", contrast);
    document.body.classList.toggle("accessibility-link-highlight", linkHL);
  }, [contrast, linkHL]);

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="כלי נגישות"
        className="fixed bottom-4 right-4 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#15A6E0] hover:bg-[#0E80AE] text-white flex items-center justify-center shadow-[0_12px_28px_rgba(21,166,224,0.5)] transition-colors"
      >
        <PersonSimpleCircle size={22} weight="duotone" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", damping: 22 }}
            className="fixed bottom-20 right-4 z-50 w-64 bg-[#0F0F0F] border border-white/10 rounded-2xl p-4 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-[family-name:var(--font-heebo)] font-bold text-sm">
                כלי נגישות
              </h3>
              <button
                onClick={() => setOpen(false)}
                aria-label="סגירה"
                className="text-gray-500 hover:text-white"
              >
                <X size={16} weight="bold" />
              </button>
            </div>
            <div className="space-y-2">
              <Toggle
                Icon={TextT}
                label="ניגודיות גבוהה"
                on={contrast}
                onChange={() => setContrast((v) => !v)}
              />
              <Toggle
                Icon={LinkIcon}
                label="הדגשת קישורים"
                on={linkHL}
                onChange={() => setLinkHL((v) => !v)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Toggle({
  Icon,
  label,
  on,
  onChange,
}: {
  Icon: typeof TextT;
  label: string;
  on: boolean;
  onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
        on
          ? "bg-[#15A6E0]/15 border-[#15A6E0]/40 text-white"
          : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
      }`}
    >
      <div className="flex items-center gap-2">
        <Icon size={18} weight="duotone" />
        <span className="text-sm font-[family-name:var(--font-heebo)]">{label}</span>
      </div>
      <div
        className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
          on ? "bg-[#15A6E0]" : "bg-white/10"
        }`}
      >
        <div
          className={`w-4 h-4 rounded-full bg-white transition-transform ${
            on ? "-translate-x-4" : ""
          }`}
        />
      </div>
    </button>
  );
}
