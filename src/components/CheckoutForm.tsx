"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  User,
  Phone,
  At,
  CheckCircle,
  Confetti,
  CircleNotch,
  ArrowLeft,
  CreditCard,
} from "@phosphor-icons/react/dist/ssr";

type Step = "details" | "payment" | "success";

const PAYMENT_URL =
  process.env.NEXT_PUBLIC_PAYMENT_URL || "https://example.com/payment";

export default function CheckoutForm() {
  const [step, setStep] = useState<Step>("details");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validate = () => {
    if (!name.trim()) return "נא למלא שם";
    if (!/^0\d{8,9}$/.test(phone.replace(/[-\s]/g, "")))
      return "מספר טלפון לא תקין";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "כתובת מייל לא תקינה";
    return "";
  };

  const submit = async () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setLoading(true);
    try {
      await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email }),
      });
      setStep("payment");
    } catch {
      setError("משהו השתבש. נסו שוב או חייגו אלינו ישירות.");
    } finally {
      setLoading(false);
    }
  };

  const goToPayment = () => {
    setStep("success");
    if (typeof window !== "undefined") {
      window.open(PAYMENT_URL, "_blank", "noopener,noreferrer");
    }
  };

  const steps: { key: Step; label: string }[] = [
    { key: "details", label: "פרטים" },
    { key: "payment", label: "תיאום" },
    { key: "success", label: "יריד" },
  ];
  const stepIndex = steps.findIndex((s) => s.key === step);

  return (
    <section id="checkout" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0D0D0D] to-[#0A0A0A]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#15A6E0]/8 rounded-full blur-[180px]" />

      <div className="relative z-10 max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 bg-[#B4CB15]/15 border border-[#B4CB15]/35 text-[#B4CB15] rounded-full px-4 py-1.5 text-xs font-bold font-[family-name:var(--font-heebo)] tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B4CB15] animate-pulse" />
            הרשמה
          </span>
          <h2 className="font-[family-name:var(--font-heebo)] font-black text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
            עכשיו זה <span className="text-gradient-primary">תורכם</span>
          </h2>
          <p className="text-gray-400 mt-3">נציג חוזר אליכם לתיאום ההגעה ליריד.</p>
        </motion.div>

        <div className="flex justify-center items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-[family-name:var(--font-heebo)] font-bold text-xs transition-all duration-300 ${
                  i <= stepIndex
                    ? "bg-gradient-to-r from-[#15A6E0] to-[#0E80AE] text-white shadow-[0_0_12px_rgba(21,166,224,0.4)]"
                    : "bg-white/5 text-gray-500 border border-white/10"
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`text-xs sm:text-sm font-[family-name:var(--font-heebo)] ${
                  i <= stepIndex ? "text-white" : "text-gray-500"
                }`}
              >
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <div
                  className={`w-6 sm:w-10 h-px ${
                    i < stepIndex ? "bg-[#15A6E0]" : "bg-white/10"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#1A1A1A] to-[#111] border border-white/10 rounded-[32px] p-7 sm:p-10"
        >
          <AnimatePresence mode="wait">
            {step === "details" && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <Field
                  Icon={User}
                  label="שם מלא"
                  value={name}
                  onChange={setName}
                  placeholder="ישראלה ישראלי"
                />
                <Field
                  Icon={Phone}
                  label="טלפון"
                  value={phone}
                  onChange={setPhone}
                  placeholder="050-1234567"
                  type="tel"
                  dir="ltr"
                />
                <Field
                  Icon={At}
                  label="מייל (לא חובה)"
                  value={email}
                  onChange={setEmail}
                  placeholder="you@example.com"
                  type="email"
                  dir="ltr"
                />

                {error && (
                  <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5">
                    {error}
                  </div>
                )}

                <motion.button
                  onClick={submit}
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="cta-glow w-full bg-gradient-to-r from-[#15A6E0] to-[#0E80AE] hover:from-[#45BCE8] hover:to-[#15A6E0] disabled:opacity-70 disabled:cursor-not-allowed text-white font-[family-name:var(--font-heebo)] font-bold text-base sm:text-lg py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 mt-3"
                >
                  {loading ? (
                    <>
                      <CircleNotch size={20} weight="bold" className="animate-spin" />
                      שולח...
                    </>
                  ) : (
                    <>
                      השאירו פרטים
                      <ArrowLeft size={20} weight="bold" />
                    </>
                  )}
                </motion.button>

                <p className="text-center text-xs text-gray-500 mt-3">
                  הפרטים שלכם מוצפנים ולא מועברים לאף גורם מסחרי.
                </p>
              </motion.div>
            )}

            {step === "payment" && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#B4CB15]/15 border border-[#B4CB15]/40 mb-5">
                  <CheckCircle size={36} weight="duotone" className="text-[#B4CB15]" />
                </div>
                <h3 className="font-[family-name:var(--font-heebo)] font-black text-2xl sm:text-3xl text-white mb-3">
                  קיבלנו את הפרטים, {name.split(" ")[0]}!
                </h3>
                <p className="text-gray-400 mb-7 leading-relaxed">
                  נציג מהקאנטרי יחזור אליכם תוך 24 שעות לתיאום קצר ואישור ההגעה ליריד.
                  <br />
                  אם תרצו להזמין מקום מראש לתשלום המיועד — לחצו כאן.
                </p>
                <motion.button
                  onClick={goToPayment}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="cta-glow inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#15A6E0] to-[#0E80AE] hover:from-[#45BCE8] hover:to-[#15A6E0] text-white font-[family-name:var(--font-heebo)] font-bold text-base sm:text-lg py-4 px-10 rounded-2xl transition-all duration-300"
                >
                  <CreditCard size={22} weight="duotone" />
                  לתשלום מאובטח מראש
                </motion.button>
                <p className="text-xs text-gray-500 mt-4">
                  סכום: 3,150 ש״ח · ללא התחייבות
                </p>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center py-4"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", delay: 0.1 }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-[#15A6E0] to-[#B4CB15] mb-5"
                >
                  <Confetti size={42} weight="fill" className="text-white" />
                </motion.div>
                <h3 className="font-[family-name:var(--font-heebo)] font-black text-2xl sm:text-3xl text-white mb-3">
                  ברוכים הבאים למשפחה!
                </h3>
                <p className="text-gray-300 mb-5 leading-relaxed">
                  שלחנו אישור למייל ולוואטסאפ. <br />
                  נתראה ביום היריד — קאנטרי קריית השרון, נתניה.
                </p>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-right space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">המנוי:</span>
                    <span className="text-white">מנוי קיץ · 3 חודשים</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">סכום (לדוגמה):</span>
                    <span className="text-[#B4CB15] font-bold">3,150 ש״ח</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">תאריך היריד:</span>
                    <span className="text-white">28.5 · 06:00–22:00</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

type FieldProps = {
  Icon: typeof User;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  dir?: "ltr" | "rtl";
};

function Field({ Icon, label, value, onChange, placeholder, type = "text", dir }: FieldProps) {
  return (
    <label className="block">
      <span className="block text-xs text-gray-400 mb-1.5 font-[family-name:var(--font-heebo)] font-bold">
        {label}
      </span>
      <div className="relative">
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
          <Icon size={20} weight="duotone" />
        </div>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          dir={dir}
          className="w-full bg-white/5 border border-white/10 focus:border-[#15A6E0]/60 focus:outline-none rounded-2xl py-3.5 pr-11 pl-4 text-white text-base placeholder-gray-600 transition-colors"
        />
      </div>
    </label>
  );
}
