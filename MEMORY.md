# MEMORY.md — דף הנחיתה של קאנטרי קריית השרון

> זיכרון טכני של הפרויקט. נטען ב-`/country-session-start`, מתעדכן רק ב-`/country-session-end`.
> כל עובדה עם תאריך אבסולוטי ו-hash. כללי הברזל ומפת החשבונות המקוצרת — ב-`CLAUDE.md`.

## Last updated
**2026-10-03 — סשן 7 (סקילים, מיפוי מלא וסגירה).** שום שינוי בקוד הדף; נוספו קבצי ניהול וסקילים. מצב הייצור נבדק: דף 200, פריסה אחרונה `a96c6be` ✅, Supabase מושהה (NXDOMAIN), דומיין Resend מאומת שוב, הטיימר פג.
PREVIOUS: 2026-06-09 — סשן 6, מעקף מייל `a96c6be`.

## Status
`PROD_URL=https://country-kiryat-hasharon.vercel.app` · `SUPABASE_REF=bfgeyufvjjrbqssvekwm`
(שורה למכונה — הסקילים קוראים ממנה. סשן 8 מעדכן ל-`https://ks-lp26.vercel.app` ול-ref החדש.)
- **🔁 מעבר לחשבונות הראשיים אושר (2026-10-03)** — GitHub `almaads2010niv` (פרטי) · Vercel `almaads-projects` / `ks-lp26` · Supabase הארגון הראשי (Pro, $10/חודש אושר) · כתובת חדשה **https://ks-lp26.vercel.app**. מבוצע בסשן 8 (ראה SESSION.md + `.claude/runs/2026-10-03_session-7-close/plan-amendment.md`).
- **הדף חי** ב-https://country-kiryat-hasharon.vercel.app ומציג את **מבצע ה-999 שפג** (הפנינג 10.6.2026). אין קמפיין פעיל.
- **צינור הלידים — חלקי:** הטופס עובד ומחזיר הצלחה; **המייל** יוצא (מעקף → `alma.ads2010@gmail.com`); **המסד לא שומר** — פרויקט Supabase מושהה (K-03).
- **15 קומיטים של קוד** (2026-05-20 → 2026-06-09) + קומיט הסגירה של סשן 7 (קבצי ניהול בלבד), ענף `main`.
- `npx tsc --noEmit` ✅ · `npm run build` ✅ (2026-10-03).

## 🎯 הקמפיין החי (מה שהדף מציג עכשיו)
| שדה | ערך |
| --- | --- |
| כותרת | "מבצע של פעם בחיים" · **"999 ₪"** (זהב `#FFD700`) · "למנוי קיץ!" · "בקאנטרי קריית השרון" |
| המבצע | 999 ₪ ל-4 חודשי קיץ (כל הקאנטרי כולל חדר כושר) → אחר כך 249 ₪/חודש בהוראת קבע → ביטול בהודעה של 30 יום |
| מחיר רגיל להשוואה | 330 ₪/חודש → חיסכון 81 ₪/חודש |
| אירוע | הפנינג מכירות · יום רביעי 10.6.26 · עד 21:00 |
| `TARGET_DATE` | `"2026-06-10T21:00:00+03:00"` ב-`src/components/Hero.tsx:7` — **פג** |
| טלפון | 09-861-6222 · כתובת: המורן 7, קריית השרון, נתניה |
| טקסט-סמן לבדיקת ייצור | `999 ₪` · `10.6.26` · `בקאנטרי קריית השרון` |

**היסטוריית מבצעים:** (1) 2026-05-20 — "יריד המכירות של הקיץ", 3,500→3,150 לזוג+1, 28.5 → 27–28.5 → הוארך ל-31.5 21:00. (2) 2026-06-07 — 999/249 עם הפנינג 10.6.

## 🗺️ מפת הדף (סדר רינדור — `src/app/page.tsx`, אומת 2026-10-03)
**Layout** (`src/app/layout.tsx`): `<html lang="he" dir="rtl">` · פונטים Heebo (כותרות) + Assistant (גוף) דרך next/font · שכבת noise · `<Analytics />` של Vercel (האנליטיקה היחידה — **אין** פיקסל מטא / GA4 / GTM, ואין אירוע המרה בהצלחת טופס) · מטא-דאטה מיושנת ("רק היום: הנחה משמעותית לרישום מוקדם") · אין OG image · אין favicon (404).
כל הקומפוננטים `"use client"` · אייקונים: Phosphor (`/dist/ssr`) · כל ה-CTA גוללים ל-`#checkout` (העוגן היחיד).

**שכבות קבועות** (לפני הסקציות):
| שכבה | קובץ | התנהגות |
| --- | --- | --- |
| StickyBar | `components/StickyBar.tsx` | למעלה, מופיע אחרי 0.8 גובה מסך · "הפנינג מכירות 999 ₪ — יום רביעי · 10.6.26 · עד 21:00" / "999 ₪ לקיץ · 249 ₪/חודש אח״כ · ביטול ב-30 יום" · CTA "תפסו מקום" |
| NotificationQueue | `components/NotificationQueue.tsx` | למטה-שמאל · "X הצטרף/ה לפני N דקות" + "N צופים בהטבה עכשיו". השמות מ-`/api/leads/recent` — שמחזיר ריק → **תמיד 10 שמות fallback מומצאים**; מספר הצופים אקראי (K-22) |
| ExitIntent | `components/ExitIntent.tsx` | **טופס לידים שני** (שם + טלפון, `source: "exit-intent"`) · דסקטופ בלבד (עכבר יוצא מלמעלה אחרי 10 שנ׳) · חוזר בכל ביקור · "רגע, אל תלכו עוד" |
| AccessibilityWidget | `components/AccessibilityWidget.tsx` | כפתור למטה-ימין · ניגודיות גבוהה / הדגשת קישורים · לא נשמר |
| CookieConsent | `components/CookieConsent.tsx` | שומר בחירה ב-localStorage (`ckh_cookie_consent`) — שום דבר לא קורא אותה |

**סקציות:**
| # | סקציה | קובץ | מה יש בה (עיקר) |
| --- | --- | --- | --- |
| 1 | Hero | `Hero.tsx` + `Countdown.tsx` | "מבצע של פעם בחיים" / "999 ₪" זהב / "למנוי קיץ!" / "בקאנטרי קריית השרון" · שורת משנה "יום רביעי הקרוב \| 10.6.26 \| הפנינג מכירות של מנוי 999 ש״ח \| מספר המקומות מוגבל \| רואים אותך אצלנו?" · רצועת תאריך · טיימר (פג → **00:00:00:00** בלי הודעה) · CTA זהב "תפסו מקום ביריד — 999 ₪ לקיץ" · רקע `<img>` של `hero.png` (809KB) |
| 2 | SocialProof | `SocialProof.tsx` | "הקאנטרי של קריית השרון" · 15+ שנים (מאז 2010) · 1,300+ מנויים פעילים · "חדש!" מכון כושר חדש ומשופץ |
| 3 | VossBlock | `VossBlock.tsx` | "שלוש שאלות קצרות" (No-oriented) + "אם עניתם ״לא״ אפילו על אחת מהן — המקום שלכם כבר מחכה." |
| 4 | FacilitiesGallery | `FacilitiesGallery.tsx` | "ככה נראה היום שלכם אצלנו" · 7 אריחים ב-`next/image`: pool-main (⭐), gym, kids-pool, studio, kids-activities, cafeteria, outdoor · "פתוח גם בשבת" |
| 5 | ComparisonTable | `ComparisonTable.tsx` | "אנחנו מול האלטרנטיבות" · קאנטרי קריית השרון / סטודיו שכונתי / פארק-בית / קאנטרי אחר · 7 שורות (כולל שבת) |
| 6 | Testimonials | `Testimonials.tsx` | "1,300+ מנויים פעילים" · 5 כרטיסים של 5 כוכבים (מיכל ק., אבי מ., ליאת ב., תמר ש., רונן א.) — **עדויות לדוגמה, לא אומתו** (K-22) |
| 7 | GuiltRelease | `GuiltRelease.tsx` | "כל קיץ אתם אומרים ״הקיץ הבא אני מתחיל״" · "מחיר נמוך במיוחד, מנוי מקוצר, ללא התחייבות שנתית" |
| 8 | PricingTable | `PricingTable.tsx` | "כניסה לקיץ ב-999 ₪ — ואחר כך 249 ₪/חודש" · 330 מחוק מול 999 + 249/חודש · "חיסכון 81 ₪/חודש" · בונוס "אזרחים ותיקים, זוגות והרכבים נוספים — מחיר מיוחד נוסף..." · CTA "אני רוצה את המחיר הזה" |
| 9 | SavingsCalculator | `SavingsCalculator.tsx` | סליידר 1–7 ביקורים בשבוע (ברירת מחדל 3) · `HOURS_PER_VISIT=2.5`, `WEEKS_IN_SUMMER=13` → 39 ימי הנאה, 98 שעות, 26 ₪ לביקור |
| 10 | RiskReversal | `RiskReversal.tsx` | "אפס סיכון. אפס חששות. רק הזדמנות." · "999 ₪ לכל הקיץ" / "ביטול בהודעה של 30 יום" / "אין דמי הרשמה נסתרים" · בלי CTA |
| 11 | HowItWorks | `HowItWorks.tsx` | "3 שלבים להתחיל את הקיץ": ממלאים פרטים → נרשמים ליריד (נציג חוזר) → מתחילים לבלות (999, אחר כך 249) |
| 12 | CheckoutForm | `CheckoutForm.tsx` | `#checkout` · "עכשיו זה תורכם" · שם / טלפון (`^0\d{8,9}$`) / מייל רשות → POST `/api/checkout` עם `{name, phone, email}` (בלי source → ברירת מחדל `landing-summer-2026`, בלי UTM) · **מציג הצלחה בלי לבדוק `res.ok`** · מסך הצלחה עם תאריך 10.6.26 |
| 13 | Footer | `Footer.tsx` | לוגו · 09-861-6222 · "06:00 – 22:00 · כולל שבת" · קישורי תקנון / פרטיות / נגישות → `#` (מתים) |

**שינוי מבצע נוגע ב:** Hero (כותרת, שורת משנה, רצועת תאריך, `TARGET_DATE`, CTA) · StickyBar (2 שורות) · PricingTable · SavingsCalculator (קבועים) · RiskReversal · GuiltRelease · HowItWorks · CheckoutForm (תגית, כפתור, מסך הצלחה) · ExitIntent · `layout.tsx` (title / description / OG) · `lib/email.ts` (נושא + שורת "יריד 27–28.5") · `api/spots` (80 מקומות).

## 🔍 ביקורת הדף — 2026-10-03 (קלט לשיפוץ; ממצאי קריאת קוד, לא נבדקו בדפדפן אלא אם צוין)
**קופי שלא תואם את מבצע ה-999 / הפנינג:**
- "יריד" במקום "הפנינג": `Hero.tsx:121` · `PricingTable.tsx:10,67,86,106,152,156` · `HowItWorks.tsx:16,17,24` · `CheckoutForm.tsx:76,81,176,208,212,230` · `ExitIntent.tsx:96`
- המייל: נושא "ליד חדש ליריד הקיץ" ושורה "יריד 27–28.5" (`lib/email.ts:30,40`) — תאריכים ישנים
- תנאי ביטול סותרים: "ביטול בכל עת" (`HowItWorks.tsx:24`), "מנוי מקוצר" (`GuiltRelease.tsx:31`) — בפועל הוראת קבע מתמשכת; "אפס סיכון / רשת ביטחון מלאה" (`RiskReversal.tsx:49-55`) נשמע כמו החזר כספי שאין; "ביטול ב-30 יום" בלי "אחרי 4 החודשים" (`StickyBar.tsx:40`, `RiskReversal.tsx:8`)
- "הוראת קבע" לא מופיע בשום מקום בדף; "ללא קיבוע מחיר" מחוק (`PricingTable.tsx:9`) מרמז על מחיר נעול; "זוגות" (`:156`) — שארית מהמבצע הישן
- מחשבון: 13 שבועות מול "4 חודשי קיץ" (~17 שבועות) → עלות לביקור מוגזמת (26 ₪ מול ~20 ₪)
- מטא-דאטה: "רק היום" / "רק ליום הפתיחה", בלי 999 ובלי תאריך (`layout.tsx:21-27`)
- תקין: חיסכון 81 ₪ (330−249), 1,300+ מנויים; אין שאריות של 3,150 / 3,500 / 1,790 / 31.5 / "14 יום" ב-`src` (יש ב-`public/sketches` וב-README)

**UX / נגישות / SEO:**
- טיימר שפג מציג 00:00:00:00 בלי הודעה, והדף עדיין אומר "יום רביעי הקרוב" ואוסף לידים (אומת)
- הצלחה מזויפת: `CheckoutForm.tsx:43-48` ו-`ExitIntent.tsx:44-49` לא בודקים `res.ok` (אומת)
- ExitIntent לא יודע שהטופס כבר מולא → לידים כפולים; חוזר בכל ביקור
- ניגודיות גבוהה מחילה `filter` על `<body>` → כל האלמנטים ה-fixed (סטיקי, התראות, מודאל, כפתור הנגישות) מפסיקים להיות צמודים למסך
- חוסרי ARIA (`aria-expanded`, `role="dialog"`, `role="alert"`), טבלת השוואה בלי סמנטיקה, אין `prefers-reduced-motion`
- אין מדיניות פרטיות (למרות איסוף פרטים אישיים) ואין הצהרת נגישות — הקישורים בפוטר מתים
- הגלילה הרמזית בטבלה במובייל לא זזה ב-RTL (`ComparisonTable.tsx:63`); החץ "←" עם "ימינה"
- התנגשות שכבות במובייל: באנר העוגיות מול ההתראות (שתיהן z-40) וכפתור הנגישות מעל הבאנר
- באג טיימר ב-NotificationQueue (`:83` תלוי ב-`viewers` שמשתנה כל 5 שנ׳ → הטוסט הראשון מתאפס)
- LCP: תמונת Hero כ-`<img>` של 809KB PNG, וה-H1 מתחיל בשקיפות 0
- קוד ב-CSS פיזי (ml/mr/left/right) — הכלל הגלובלי של ניב דורש לוגי (ms/me/start/end) בקוד חדש
- `lead.name` לא מוברח בתוך `<title>` של המייל (`lib/email.ts:34`)
- שאריות: `lucide-react` לא בשימוש · `npm run lint` (`next lint` הוסר ב-Next 16, ואין קונפיג ESLint) · `sharp` לא מוצהר ב-package.json (רק הסקריפט צריך אותו)

## 🔑 חשבונות ו-URLs
| שירות | מזהה | חשבון | גישה של קלוד |
| --- | --- | --- | --- |
| ייצור | https://country-kiryat-hasharon.vercel.app | Vercel `alma-gads-projects` | curl בלבד |
| Vercel | `vercel.com/alma-gads-projects/country-kiryat-hasharon` | alma.gads2010@gmail.com | **אין** CLI/MCP — דפדפן אינקוגניטו של ניב |
| GitHub | `ALMA-GADS/country-kiryat-hasharon` (ציבורי) · `git@github.com:ALMA-GADS/country-kiryat-hasharon.git` | alma.gads2010@gmail.com | push ב-SSH (מפתח `claude-ckh-deploy`, 2026-05-20) · סטטוס פריסה דרך API ציבורי |
| Supabase | פרויקט `bfgeyufvjjrbqssvekwm` "country-kiryat-hasharon" · ארגון ALMA-GADS's · eu-west-1 · Free | alma.gads2010@gmail.com | **אין** MCP — SQL Editor בדפדפן |
| Resend | דומיין `alma-ads.co.il` (id `2fc6df44-5e18-4a37-ad83-d1577390013f`) · מפתח API "country-kiryat-hasharon" (2026-05-23) | alma.ads2010@gmail.com (ALMA ADS, משותף עם My Special Offer) | API עם המפתח מ-`.env.local` |
| DNS של alma-ads.co.il | Cloudflare (`bella` / `andronicus.ns.cloudflare.com`) | לא ידוע לקלוד | אין |
| ❌ כפול (לא לפרוס אליו; מחיקה = החלטת ניב) | https://country-kiryat-hasharon-mocha.vercel.app · `prj_RMJ4bwN0SoaB71ULXa8vd8l5nLSf` | Vercel אישי `almaads-projects` (team_4vnGIZxZnzU5Nc6DDp5BnSi7) | MCP/CLI האישיים |
| קובץ לידים שיוצא | `C:\Users\USER\Desktop\leads-country-kiryat-hasharon.xlsx` (2026-05-28, 17 לידים אמיתיים) | — | מחוץ לריפו |

## Env Vars (שמות בלבד — ערכים ב-`.env.local` וב-Vercel)
| משתנה | שימוש | הערה |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | `lib/supabase.ts` | `https://bfgeyufvjjrbqssvekwm.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `lib/supabase.ts` | מפתח publishable חדש (`sb_publishable_…`) |
| `SUPABASE_SERVICE_ROLE_KEY` | `supabaseAdmin` ← 3 הנקודות הרדומות | ריק — **לא להוסיף לפני טיפול ב-K-21** |
| `RESEND_API_KEY` | `lib/email.ts` | חובה |
| `LEAD_NOTIFICATION_EMAIL` | `lib/email.ts` | `niv@alma-ads.co.il` — **כרגע רק reply-to** (מעקף K-07) |
| `LEAD_FROM_EMAIL` | `lib/email.ts` | `Country Kiryat HaSharon <leads@alma-ads.co.il>` — **כרגע מתעלמים ממנו** (K-07) |
| `NEXT_PUBLIC_PAYMENT_URL` | בוטל | "רק לידים" |

## Stack ומבנה
Next.js 16.1.6 · React 19.2 · TypeScript 5 · Tailwind v4 (`@tailwindcss/postcss`) · Framer Motion 12 · `@phosphor-icons/react` · `lucide-react` (שארית) · `@supabase/supabase-js` · `resend` · `@vercel/analytics`.
```
src/app/page.tsx, layout.tsx, globals.css
src/app/api/checkout/route.ts        POST — ליד: אימות שם+טלפון → Supabase insert עם anon (שגיאה לא חוסמת) → await sendLeadEmail → תמיד {ok:true}
src/app/api/checkout/status/route.ts PATCH — עדכון סטטוס ליד, בלי אימות. רדום (צריך service role) — K-21
src/app/api/leads/recent/route.ts    GET — שמות פרטיים של לידים מ-6 השעות האחרונות ל-FOMO. רדום → מחזיר [] — K-21
src/app/api/spots/route.ts           GET — 80 פחות ספירת לידים. רדום → fallback {remaining:23,total:80}; לא בשימוש ב-UI — K-21
src/app/api/test-email/route.ts      GET/POST — ⚠️ נקודת דיבאג ציבורית (K-08)
src/lib/email.ts                     תבנית מייל + Resend (מעקף K-07)
src/lib/supabase.ts                  `supabase` (anon/publishable) + `supabaseAdmin` (רק אם SUPABASE_SERVICE_ROLE_KEY מוגדר — כרגע לא)
src/components/*                     19 קומפוננטים (ראה מפת הדף)
public/images/*.png                  9 תמונות (hero, pool-main, gym, studio, kids-pool, kids-activities, cafeteria, outdoor, logo) — ~6MB
public/sketches/*.html               סקיצות עיצוב מ-2026-05-20 (מוגשות בייצור)
scripts/compress-images.mjs          דחיסה עם sharp
```
**טבלת `leads`:** `id uuid` · `name` · `phone` · `email` · `source` (ברירת מחדל `landing-summer-2026`) · `status` (`new/contacted/paid/lost`) · `created_at` · `updated_at`. RLS כבוי; ל-anon רק INSERT (K-05). רשומות בדיקה ידועות: לידי "בדיקה" מ-2026-05-20, `source = debug-test` ו-`final-test` (2026-06-09); `test-email-endpoint` — מייל בלבד. ייצוא 2026-05-28: 26 שורות → 17 לידים אמיתיים.

## ⚠️ מוקשים (Known Issues) — ממוספרים, לא מוחקים; נפתר = ✅ + תאריך + hash
- **K-01 — `vercel` CLI מהתיקייה פורס לכפול.** `.vercel/project.json` → `prj_RMJ4bwN0SoaB71ULXa8vd8l5nLSf` בצוות האישי (מאז 2026-05-23). פריסה רק ב-`git push origin main`.
- **K-02 — אין גישה ל-Vercel של ALMA GADS.** ה-MCP וה-CLI מחוברים ל-`almaads-projects`. אימות פריסה: `api.github.com/repos/ALMA-GADS/country-kiryat-hasharon/commits/<sha>/status`. לוגים / env = ניב בחלון האינקוגניטו.
- **K-03 — Supabase חינמי נכנס להשהיה אחרי 7 ימים בלי תנועה.** קרה ב-2026-06-08 (ניב הפעיל). ב-2026-10-03 ה-host מחזיר NXDOMAIN → מושהה שוב, כנראה מאמצע יוני. **חלון השחזור בלחיצה הוא 90 יום** — כנראה עבר; אז: הורדת גיבוי מהדשבורד → פרויקט חדש → טבלת leads → עדכון 2 משתני Supabase ב-Vercel. בזמן ההשהיה הלידים לא נשמרים במסד (המייל ממשיך — `38fe943`).
- **K-04 — ה-MCP של Supabase מחובר לארגון אחר** (`almaads2010niv` / `zputrrzeqeblnovmlowc`). SQL וייצוא — דרך ה-SQL Editor בדפדפן של ALMA-GADS.
- **K-05 — מפתח publishable החדש לא ממופה ל-`anon` במדיניות RLS** → RLS כובה בטבלת leads, ול-anon ניתן INSERT בלבד (2026-05-20). לכן: אין `.select()` אחרי insert. הפעלת RLS מחדש דורשת מדיניות לרול שהמפתח החדש ממופה אליו — לבדוק לפני שנוגעים.
- **K-06 — Resend בלי דומיין מאומת שולח רק לבעל החשבון** (`alma.ads2010@gmail.com`). ב-2026-06-09 רשומות DKIM/SPF נעלמו מ-Cloudflare → `failed`. ב-2026-10-03 הרשומות חזרו והדומיין `verified` (מי החזיר — לא ידוע; הדומיין משותף עם My Special Offer).
- **K-07 — מעקף זמני ב-`src/lib/email.ts`** (`76cf564` + `a96c6be`): FROM קבוע `onboarding@resend.dev`, TO קבוע `alma.ads2010@gmail.com`, `LEAD_FROM_EMAIL` לא בשימוש ו-`LEAD_NOTIFICATION_EMAIL` משמש רק כ-reply-to. **תנאי היציאה התקיים (דומיין מאומת, 2026-10-03)** → להחזיר לשליחה ישירה ל-niv@alma-ads.co.il מ-leads@alma-ads.co.il.
- **K-08 — `/api/test-email` ציבורי בייצור** (`a389cc9`): GET חושף את כתובות המייל ואת מצב התצורה; POST שולח מייל אמיתי לכל מי שקורא. להסיר.
- **K-09 — serverless הורג קריאות fire-and-forget.** `sendLeadEmail` חייב `await` (`e6fe8a1`, 2026-05-24).
- **K-10 — כשלים שקטים:** ה-API מחזיר `{ok:true}` גם כשהמסד והמייל נכשלו (רק `console.error`), והטופס מציג הצלחה בלי לבדוק `res.ok`. תקלה אמיתית נראית רק בלוגים של Vercel (K-02).
- **K-11 — שינוי env ב-Vercel נכנס לתוקף רק בפריסה הבאה** — פריסה מחדש בקומיט ריק.
- **K-12 — הכפול `country-kiryat-hasharon-mocha.vercel.app` עדיין חי** (נבדק 2026-10-03) עם המבצע הישן (27–28.5, 3,150, 31.5) ועם אותם משתני Supabase/Resend → משפך מקביל מיושן. מחיקה = החלטה של ניב (חשבון אישי).
- **K-13 — כרום:** החשבונות של ALMA GADS פתוחים באינקוגניטו; תוסף Claude in Chrome עובד על הפרופיל הרגיל (חשבונות אישיים) אלא אם הופעל "Allow in Incognito". דשבורד ALMA GADS מהפרופיל הרגיל = 404 / חשבון שגוי.
- **K-14 — הטיימר פג** (`TARGET_DATE` 2026-06-10) והדף עדיין מציג את המבצע. כל קמפיין חדש מתחיל בעדכון `TARGET_DATE` ובכל המקומות ב"שינוי מבצע נוגע ב".
- **K-15 — מחבר הקומיטים:** `Niv <alma.ads2010@gmail.com>` (מוגדר מקומית). לא לשנות — קומיטים מ-`niv@alma-ads.co.il` נחסמו בפריסות Vercel בפרויקטים אחרים.
- **K-16 — הריפו ציבורי.** אין סודות בקוד, בקבצי הזיכרון או בהודעות קומיט.
- **K-17 — סודות שעברו בצ'אט:** סיסמת מסד ה-Supabase (2026-05-20) וערך מפתח ה-Resend (2026-05-23) מופיעים בטרנסקריפט → מומלץ לסובב (מפתח Resend "country-kiryat-hasharon"; סיסמת המסד — אם הפרויקט ייווצר מחדש, מתייתר).
- **K-18 — README מיושן** (service role, לינק תשלום, `vercel` CLI) — נוסף באנר אזהרה ב-2026-10-03.
- **K-19 — `public/sketches/*` מוגשות בייצור** (`/sketches/index.html` מחזיר 200) — ארכיון עיצוב, לא חלק מהדף.
- **K-20 — מודל:** ב-2026-05-23 Opus סירב שוב ושוב (חסימת מדיניות שגויה סביב יצירת מפתח API בדפדפן) → עבר ל-Sonnet. אם חוזר — להחליף מודל.
- **K-21 — נקודות API רדומות שמתעוררות עם מפתח service role.** `/api/leads/recent` (שמות פרטיים של נרשמים), `/api/spots` (נפח לידים), `/api/checkout/status` (PATCH לשינוי סטטוס **בלי אימות**) — כולן עובדות רק כש-`SUPABASE_SERVICE_ROLE_KEY` מוגדר. היום הוא ריק (מקומית ובייצור — אומת לפי התגובות ב-2026-10-03). **לפני שמוסיפים את המפתח — למחוק או לאבטח את שלושתן.**
- **K-22 — הוכחה חברתית מומצאת.** NotificationQueue מציג תמיד 10 שמות fallback ודקות מזויפות (כי `/api/leads/recent` ריק) ומספר צופים אקראי; העדויות ב-Testimonials הן דוגמאות שלא אומתו (אותם שמות כמו ה-fallback). סיכון הגנת הצרכן — לאמת מול הקאנטרי או להסיר.
- **K-23 — שתי נקודות כניסה ללידים:** CheckoutForm (בלי source → `landing-summer-2026`) ו-ExitIntent (`exit-intent`, דסקטופ בלבד). כל שינוי בטופס/באימות/במסך הצלחה — בשתיהן. בייצוא לידים לסנן לפי source.

## 📋 עבודה פתוחה (לפי עדיפות)
**P0 — סשן 8 (מאושר):**
- [ ] מעבר לחשבונות הראשיים: ריפו פרטי, Supabase חדש ב-Pro, Vercel `ks-lp26`, הפניה מהכתובת הישנה — K-01, K-02, K-03, K-04, K-12, K-13
- [ ] מייל ישיר ל-niv@alma-ads.co.il מ-leads@alma-ads.co.il — K-07 + ליד בדיקה אמיתי
- [ ] להסיר את `/api/test-email` — K-08
- [ ] הצלחה מזויפת בשני הטפסים + כשל אמיתי מה-API — K-10
- [ ] (סשן 9) להחליט מה הדף מציג: קמפיין חדש או מצב "אין מבצע פעיל" — K-14
- [ ] (ניב, לא חוסם) להוריד גיבוי של מסד ה-Supabase הישן ב-ALMA GADS

**P1 — יחד עם השיפוץ:**
- [ ] למחוק את הכפול mocha ולנתק את `.vercel/project.json` המקומי — K-01, K-12 (החלטת ניב)
- [ ] להציג שגיאה אמיתית כש-API לא מחזיר `ok` (בשני הטפסים) + להחזיר מה-API כשל כשגם המסד וגם המייל נכשלו — K-10
- [ ] לנקות את כל הקופי שלא תואם את המבצע (רשימה ב"ביקורת הדף") — או לכתוב מחדש לפי הקמפיין הבא
- [ ] מצב "פג" לטיימר (הודעה / הסתרה) במקום 00:00:00:00
- [ ] להחליט על ההוכחה החברתית: עדויות אמיתיות או הסרה; להסיר את ה-fallback המומצא — K-22
- [ ] למחוק או לאבטח את נקודות ה-API הרדומות — K-21
- [ ] דף פרטיות + הצהרת נגישות + קישורי פוטר אמיתיים
- [ ] מטא-דאטה עדכנית + OG image + favicon
- [ ] אירוע המרה בהצלחת טופס (+ פיקסל מטא אם רצים קמפיינים ממומנים), בכפוף להסכמת עוגיות
- [ ] לסובב את מפתח Resend ואת סיסמת המסד — K-17

**P2:**
- [ ] ביצועים: Hero ב-`next/image` + WebP; להסיר `public/sketches`
- [ ] נגישות: תיקון הניגודיות הגבוהה (filter על body), ARIA, `prefers-reduced-motion`, סמנטיקת טבלה
- [ ] באג הטיימר ב-NotificationQueue; גלילת הטבלה ב-RTL; התנגשות שכבות במובייל
- [ ] ExitIntent: לא להציג אחרי הרשמה / לזכור סגירה
- [ ] ניקיון: `lucide-react`, סקריפט lint, הצהרת `sharp`, README
- [ ] רעיונות פתוחים מ-NIV_PROMPTS_IDEAS (Zapier / Sheets / וואטסאפ / ייצוא קבוע)
