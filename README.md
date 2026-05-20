# קאנטרי קריית השרון — דף נחיתה פתיחת מכירות קיץ

דף נחיתה Next.js 16 ב-RTL/עברית עבור פתיחת מכירות מנוי הקיץ.
משלב פאנל מלא של טכניקות שכנוע — מ-Hero דרמטי, דרך גלריית "יום חדש",
טבלת השוואה, מחשבון חיסכון, הסרת חשש, וטופס הרשמה עם Supabase.

---

## הפעלה מקומית

```bash
npm install
cp .env.local.example .env.local   # מלאו את הפרטים, או השאירו ריק לפיתוח
npm run dev
```

האתר עולה על http://localhost:3000

---

## משתני סביבה (`.env.local`)

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=anon_key_here
SUPABASE_SERVICE_ROLE_KEY=service_role_key_here
NEXT_PUBLIC_PAYMENT_URL=https://meshulam.co.il/.../payment-page
NEXT_PUBLIC_WHATSAPP=+972500000000
```

> ללא Supabase האתר עדיין רץ — הלידים פשוט נרשמים ל-console.
> Zapier יתחבר כ-Webhook ב-Supabase על הטבלה `leads` (insert event) — הגדרה חיצונית.

---

## Schema של Supabase

צרו את הטבלה הבאה (SQL editor של Supabase):

```sql
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  source text default 'landing-summer-2026',
  status text default 'new' check (status in ('new','contacted','paid','lost')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists leads_created_at_idx on public.leads(created_at desc);
create index if not exists leads_status_idx on public.leads(status);
create index if not exists leads_source_idx on public.leads(source);

-- RLS — חסום הכל מהקליינט; רק service role יכתוב
alter table public.leads enable row level security;
```

ה-API routes משתמשים ב-`SUPABASE_SERVICE_ROLE_KEY` ועוקפים RLS — לכן שמרו את המפתח רק בצד שרת.

---

## תמונות

ראו [public/images/README.md](public/images/README.md). הדף עובד מהרגע הראשון עם SVG placeholders.

---

## פריסה ל-Vercel

```bash
vercel
# בעלייה הראשונה — הוסיפו את משתני הסביבה (Production + Preview)
```

או דרך הממשק: https://vercel.com/new ובחירת הריפו.

---

## נקודות לכייל מאוחר יותר

| מה | היכן | ערך נוכחי |
| --- | --- | --- |
| תאריך פתיחת המכירות (Countdown) | `src/components/Hero.tsx` ← `TARGET_DATE` | `2026-06-15T08:00:00+03:00` |
| מחיר מנוי קיץ | `src/components/PricingTable.tsx` + `SavingsCalculator.tsx` | 1,790 ש"ח (במקום 2,400) |
| מספר טלפון | `src/components/Footer.tsx` | 09-000-0000 |
| בונוס יום הפתיחה | `src/components/PricingTable.tsx` | טקסט גנרי |
| כתובת לתשלום (אחרי טופס) | `.env.local` ← `NEXT_PUBLIC_PAYMENT_URL` | placeholder |
| המלצות מנויים | `src/components/Testimonials.tsx` | 5 לדוגמה |
| 80 מקומות (Hero, API) | `src/components/Hero.tsx` + `src/app/api/spots/route.ts` | 80 |

---

## מבנה הפרויקט

```
src/
├── app/
│   ├── api/
│   │   ├── checkout/route.ts          # POST — יצירת ליד
│   │   ├── checkout/status/route.ts   # PATCH — עדכון סטטוס
│   │   ├── leads/recent/route.ts      # GET — לידים אחרונים ל-FOMO
│   │   └── spots/route.ts             # GET — מקומות שנותרו
│   ├── globals.css                    # ערכת עיצוב + אנימציות
│   ├── layout.tsx                     # פונטים, RTL, מטא
│   └── page.tsx                       # הרכבת כל הסקציות
├── components/
│   ├── Hero.tsx + Countdown.tsx
│   ├── SocialProof.tsx + VossBlock.tsx
│   ├── FacilitiesGallery.tsx          # "מכירת יום חדש"
│   ├── ComparisonTable.tsx + Testimonials.tsx + GuiltRelease.tsx
│   ├── PricingTable.tsx + SavingsCalculator.tsx + RiskReversal.tsx
│   ├── HowItWorks.tsx + CheckoutForm.tsx
│   ├── StickyBar.tsx + NotificationQueue.tsx + ExitIntent.tsx
│   ├── AccessibilityWidget.tsx + CookieConsent.tsx
│   └── Footer.tsx
└── lib/supabase.ts
```

## ערכת הצבעים

| שם | hex | שימוש |
| --- | --- | --- |
| Primary (כחול) | `#15A6E0` | CTA, כותרות, הדגשה |
| Secondary (ליים) | `#B4CB15` | אנטרים, accent הצלחה |
| רקע | `#0A0A0A` | כל הדף |
| כרטיסים | `#1A1A1A → #111` | סקציות |
