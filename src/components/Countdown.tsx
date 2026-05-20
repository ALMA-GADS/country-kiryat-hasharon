"use client";

import { useEffect, useState } from "react";

type Props = {
  targetDate: string;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(target: string): TimeLeft {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown({ targetDate }: Props) {
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTime(getTimeLeft(targetDate));
    const id = setInterval(() => setTime(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (!time) {
    return (
      <div className="flex gap-2 sm:gap-3 justify-center" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white/5 backdrop-blur-sm rounded-2xl px-4 py-3 min-w-[70px] border border-white/10 h-[78px]"
          />
        ))}
      </div>
    );
  }

  const units: { value: number; label: string }[] = [
    { value: time.days, label: "ימים" },
    { value: time.hours, label: "שעות" },
    { value: time.minutes, label: "דקות" },
    { value: time.seconds, label: "שניות" },
  ];

  return (
    <div className="flex gap-2 sm:gap-3 justify-center" dir="ltr">
      {units.map((u, i) => (
        <div
          key={i}
          className="bg-white/5 backdrop-blur-sm rounded-2xl px-4 py-3 min-w-[70px] border border-white/10 text-center"
        >
          <div className="font-[family-name:var(--font-heebo)] font-black text-3xl sm:text-4xl text-white counter-number">
            {String(u.value).padStart(2, "0")}
          </div>
          <div className="text-gray-400 text-xs mt-1 font-[family-name:var(--font-heebo)]">
            {u.label}
          </div>
        </div>
      ))}
    </div>
  );
}
