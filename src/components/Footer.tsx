"use client";

import Image from "next/image";
import { MapPin, Phone, Clock } from "@phosphor-icons/react/dist/ssr";

export default function Footer() {
  return (
    <footer className="relative py-14 border-t border-white/5 overflow-hidden bg-[#050505]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px bg-gradient-to-r from-transparent via-[#15A6E0]/30 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 sm:gap-12 mb-8">
          <div className="flex flex-col items-center sm:items-start gap-3">
            <div className="relative w-14 h-14">
              <Image
                src="/images/logo.png"
                alt="לוגו קאנטרי קריית השרון"
                fill
                className="object-contain"
                sizes="56px"
              />
            </div>
            <div className="text-center sm:text-right">
              <div className="text-white font-[family-name:var(--font-heebo)] font-bold text-base">
                קאנטרי קריית השרון
              </div>
              <div className="text-gray-500 text-xs mt-1">
                מועדון הספורט של השכונה — מאז 2010
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8 flex-1 text-center sm:text-right">
            <div className="flex flex-col items-center sm:items-start gap-2">
              <MapPin size={20} weight="duotone" className="text-[#15A6E0]" />
              <div className="text-gray-300 text-sm">קריית השרון, נתניה</div>
            </div>
            <div className="flex flex-col items-center sm:items-start gap-2">
              <Phone size={20} weight="duotone" className="text-[#B4CB15]" />
              <a
                href="tel:+97298616222"
                className="text-gray-300 text-sm hover:text-white transition-colors"
                dir="ltr"
              >
                09-861-6222
              </a>
            </div>
            <div className="flex flex-col items-center sm:items-start gap-2">
              <Clock size={20} weight="duotone" className="text-[#15A6E0]" />
              <div className="text-gray-300 text-sm">06:00 – 22:00 · כולל שבת</div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <div>
            © {new Date().getFullYear()} קאנטרי קריית השרון. כל הזכויות שמורות.
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-400 transition-colors">תקנון</a>
            <a href="#" className="hover:text-gray-400 transition-colors">פרטיות</a>
            <a href="#" className="hover:text-gray-400 transition-colors">נגישות</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
