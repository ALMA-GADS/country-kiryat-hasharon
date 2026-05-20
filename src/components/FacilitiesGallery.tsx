"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const facilities = [
  {
    src: "/images/pool-main.png",
    alt: "בריכה חצי אולימפית מקורה ומחוממת",
    label: "בריכה חצי אולימפית",
    emotion:
      "מקורה ומחוממת לכל אורך השנה. 45 דקות בלבד בבוקר — וכל היום נראה אחרת.",
    span: "sm:col-span-2 sm:row-span-2",
    pin: "⭐ הכי טוב",
  },
  {
    src: "/images/gym.png",
    alt: "מכון כושר חדש ומשופץ",
    label: "מכון כושר חדש",
    emotion:
      "חדש ומשופץ — ציוד חדיש, מרחב נושם, מאמנים שמכירים אתכם בשם.",
    span: "",
  },
  {
    src: "/images/kids-pool.png",
    alt: "בריכת פעוטות גדולה",
    label: "בריכת פעוטות",
    emotion:
      "מים רדודים, שמש, צחוקים — והילדים הקטנים שלכם רחוצים, רגועים ושמחים.",
    span: "",
  },
  {
    src: "/images/studio.png",
    alt: "חוגי סטודיו — יוגה, פילאטיס, ספינינג",
    label: "חוגי סטודיו",
    emotion:
      "יוגה, פילאטיס, ספינינג, זומבה ועוד. שעה אחת בשבוע שמחזירה לכם את הראש.",
    span: "sm:col-span-2",
  },
  {
    src: "/images/kids-activities.png",
    alt: "הפעלות לכל המשפחה",
    label: "הפעלות לכל המשפחה",
    emotion:
      "שעה אחת של תנועה, חברים וצחוק — והילד שלכם חוזר עייף מהסוג הטוב.",
    span: "",
  },
  {
    src: "/images/cafeteria.png",
    alt: "קפיטריה בקאנטרי בקיץ",
    label: "קפיטריה",
    emotion:
      "קפה טוב, ארטיק לילדים, ארוחת בוקר עם נוף לבריכה. כל מה שצריך כדי להישאר.",
    span: "",
  },
  {
    src: "/images/outdoor.png",
    alt: "פינה ירוקה ושטח חיצוני",
    label: "פינה ירוקה",
    emotion:
      "בלב השכונה, בין החורשה לבניינים. עיר אחת בחוץ — ועולם אחר ברגע שאתם נכנסים.",
    span: "sm:col-span-2",
  },
];

export default function FacilitiesGallery() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0D0D0D] to-[#0A0A0A]" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#15A6E0]/5 rounded-full blur-[180px]" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#B4CB15]/5 rounded-full blur-[180px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 bg-[#15A6E0]/15 border border-[#15A6E0]/35 text-[#15A6E0] rounded-full px-4 py-1.5 text-xs font-bold font-[family-name:var(--font-heebo)] tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#15A6E0] animate-pulse" />
            המתחם שלנו
          </span>
          <h2 className="font-[family-name:var(--font-heebo)] font-black text-3xl sm:text-4xl md:text-5xl leading-tight text-white mb-3">
            ככה נראה <span className="text-gradient-primary">היום שלכם</span> אצלנו
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            לא רק מתקנים. מקום אחד שבו אתם מורידים הילוך, מטעינים את עצמכם והילדים שמחים.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[280px] sm:auto-rows-[260px]">
          {facilities.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`relative rounded-3xl overflow-hidden group ${item.span} ${
                i === 0 ? "sm:row-span-2" : ""
              }`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.55] group-hover:brightness-[0.45]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                <h3 className="font-[family-name:var(--font-heebo)] font-bold text-lg sm:text-xl text-white mb-1.5">
                  {item.label}
                </h3>
                <p className="font-[family-name:var(--font-assistant)] text-[13px] sm:text-sm text-white/80 leading-relaxed max-w-md">
                  {item.emotion}
                </p>
              </div>

              {item.pin && (
                <div className="absolute top-4 right-4 bg-[#15A6E0] text-white font-[family-name:var(--font-heebo)] font-black text-[11px] px-2.5 py-1 rounded-full shadow-[0_0_16px_rgba(21,166,224,0.6)]">
                  {item.pin}
                </div>
              )}

              <div
                className="absolute top-4 left-4 w-2.5 h-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_12px_currentColor]"
                style={{ background: i % 2 === 0 ? "#15A6E0" : "#B4CB15", color: i % 2 === 0 ? "#15A6E0" : "#B4CB15" }}
              />
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 text-sm mt-8 font-[family-name:var(--font-heebo)]"
        >
          פתוח גם בשבת · בלב שכונת קריית השרון, נתניה
        </motion.p>
      </div>
    </section>
  );
}
