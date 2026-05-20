import type { Metadata } from "next";
import { Heebo, Assistant } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
  display: "swap",
});

const assistant = Assistant({
  variable: "--font-assistant",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "קאנטרי קריית השרון | פתיחת מכירות מנוי קיץ — הנחה מיוחדת",
  description:
    "פתיחת מכירות מנוי קיץ 2026 בקאנטרי קריית השרון. בריכה חצי אולימפית מקורה, סאונה, מכון כושר, חוגי סטודיו וילדים — והכל באווירה משפחתית. רק היום: הנחה משמעותית לרישום מוקדם.",
  openGraph: {
    title: "קאנטרי קריית השרון | פתיחת מכירות קיץ",
    description:
      "מנוי קיץ במחיר היכרות — רק ליום הפתיחה. בריכה, סאונה, מכון כושר וחוגים בלב נתניה.",
    type: "website",
    locale: "he_IL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl">
      <body
        className={`${heebo.variable} ${assistant.variable} font-[family-name:var(--font-assistant)] antialiased`}
      >
        <div className="noise-overlay" />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
