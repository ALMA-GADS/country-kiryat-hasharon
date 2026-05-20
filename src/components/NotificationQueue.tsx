"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, CheckCircle, X } from "@phosphor-icons/react/dist/ssr";

const FALLBACK_NAMES = [
  "מיכל מקריית השרון",
  "אבי משכונת הפועל",
  "ליאת מנוף הים",
  "תמר מרמת פולג",
  "רונן מקריית השרון",
  "שירה מקריית נורדאו",
  "דני מקריית השרון",
  "נועה מאזורים",
  "יעל מאזור התעשייה",
  "אסף מקריית השרון",
];

type Lead = { firstName: string; minutesAgo: number };
type Notification =
  | { kind: "fomo"; key: string; name: string; minutesAgo: number }
  | { kind: "viewers"; key: string; count: number };

export default function NotificationQueue() {
  const [current, setCurrent] = useState<Notification | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [viewers, setViewers] = useState(() => 9 + Math.floor(Math.random() * 12));

  useEffect(() => {
    fetch("/api/leads/recent")
      .then((r) => r.json())
      .then((d) => setLeads(d?.leads || []))
      .catch(() => setLeads([]));
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setViewers((v) => {
        const delta = Math.random() < 0.5 ? -1 : 1;
        return Math.max(9, Math.min(24, v + delta));
      });
    }, 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (dismissed) return;
    let i = 0;
    const initialTimer = setTimeout(() => loop(), 6000);

    function loop() {
      if (dismissed) return;
      const n = nextNotification(i++);
      setCurrent(n);
      setTimeout(() => {
        setCurrent(null);
        setTimeout(loop, 1500);
      }, 5000);
    }

    function nextNotification(idx: number): Notification {
      if (idx % 2 === 0) {
        const pool = leads.length
          ? leads.map((l) => ({ name: l.firstName, minutesAgo: l.minutesAgo }))
          : FALLBACK_NAMES.map((n, k) => ({
              name: n,
              minutesAgo: 2 + ((k * 3) % 17),
            }));
        const pick = pool[Math.floor(Math.random() * pool.length)];
        return {
          kind: "fomo",
          key: `fomo-${idx}`,
          name: pick.name,
          minutesAgo: pick.minutesAgo,
        };
      }
      return { kind: "viewers", key: `viewers-${idx}`, count: viewers };
    }

    return () => clearTimeout(initialTimer);
  }, [dismissed, leads, viewers]);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          key={current.key}
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          transition={{ type: "spring", damping: 20 }}
          className="fixed bottom-4 left-4 z-40 max-w-[280px] sm:max-w-[320px]"
        >
          <div
            onClick={() => setDismissed(true)}
            role="button"
            tabIndex={0}
            className="cursor-pointer bg-[#0A0A0A]/95 backdrop-blur-xl border border-white/15 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-2xl hover:border-white/25 transition-colors"
          >
            {current.kind === "fomo" ? (
              <>
                <div className="shrink-0 w-9 h-9 rounded-full bg-[#B4CB15]/15 border border-[#B4CB15]/40 flex items-center justify-center">
                  <CheckCircle size={18} weight="duotone" className="text-[#B4CB15]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-xs sm:text-sm font-[family-name:var(--font-heebo)] font-semibold truncate">
                    {current.name} הצטרפ/ה
                  </div>
                  <div className="text-gray-500 text-[11px] truncate">
                    לפני {current.minutesAgo} דקות
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="shrink-0 w-9 h-9 rounded-full bg-[#15A6E0]/15 border border-[#15A6E0]/40 flex items-center justify-center">
                  <Eye size={18} weight="duotone" className="text-[#15A6E0]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-xs sm:text-sm font-[family-name:var(--font-heebo)] font-semibold">
                    {current.count} צופים בהטבה עכשיו
                  </div>
                  <div className="text-gray-500 text-[11px]">
                    מקומות מתפנים במהירות
                  </div>
                </div>
              </>
            )}
            <X size={14} weight="bold" className="text-gray-600 shrink-0" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
