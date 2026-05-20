"use client";

import { motion } from "framer-motion";

export default function GuiltRelease() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0F0F0F] to-[#0A0A0A]" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#15A6E0]/8 rounded-full blur-[200px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#B4CB15]/8 rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 bg-[#15A6E0]/15 border border-[#15A6E0]/35 text-[#15A6E0] rounded-full px-4 py-1.5 text-xs font-bold font-[family-name:var(--font-heebo)] tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#15A6E0] animate-pulse" />
            רגע של אמת
          </span>
          <h2 className="font-[family-name:var(--font-heebo)] font-black text-3xl sm:text-4xl md:text-5xl leading-tight mb-6 text-white">
            כל קיץ אתם אומרים <br />
            <span className="text-gradient-primary">״הקיץ הבא אני מתחיל״</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-4">
            אנחנו יודעים. אנחנו לא שופטים. רוב האנשים שמצטרפים אלינו
            כבר אמרו את זה לעצמם פעמיים-שלוש.
          </p>
          <p className="text-base sm:text-lg text-white/90 leading-relaxed">
            אז הפעם הסרנו את כל התירוצים: מחיר נמוך במיוחד, מנוי מקוצר,
            ללא התחייבות שנתית — ועם הזמן להתחיל ברצינות.
          </p>
          <p className="text-[#B4CB15] text-base sm:text-lg font-bold mt-6 font-[family-name:var(--font-heebo)]">
            לא נשאר אף תירוץ. רק להחליט.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
