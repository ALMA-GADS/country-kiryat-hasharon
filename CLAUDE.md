# קאנטרי קריית השרון — דף נחיתה למכירת מנויים (country-kiryat-hasharon)

דף נחיתה בעברית RTL לקאנטרי קריית השרון (המורן 7, נתניה). אוסף לידים בלבד (בלי תשלום) → Supabase + התראת מייל ב-Resend.
ייצור: **https://country-kiryat-hasharon.vercel.app** · ריפו (ציבורי): `ALMA-GADS/country-kiryat-hasharon`.

## קבצי ניהול
- `MEMORY.md` — מצב טכני: הקמפיין החי, מפת הדף, מפת חשבונות, מוקשים K-xx, עבודה פתוחה. **מקור האמת.**
- `SESSION.md` — טבלת הסשנים, "מצב נוכחי", פרומפט מוכן לסשן הבא.
- `PROJECT_STORY.txt` — סיפור הפרויקט סשן-אחר-סשן.
- `NIV_PROMPTS_IDEAS.md` — ציטוטים, החלטות ורעיונות של ניב.
- `README.md` — שלד מקורי מ-19.5.2026, **לא מעודכן**. לא לפעול לפיו.

## תהליך עבודה
פתיחה: `/country-session-start` · אמצע סשן: `/country-checkpoint` · סגירה: `/country-session-end`.
עבודה על main. קוד וקמיטים באנגלית, תקשורת ו-UI בעברית.

## 🔑 מפת חשבונות — "הכל על ALMA GADS"
| שירות | חשבון נכון | הערה |
| --- | --- | --- |
| GitHub | `ALMA-GADS` (alma.gads2010@gmail.com) | דחיפה ב-SSH (מפתח `claude-ckh-deploy`). המשתמש המקומי של `gh` הוא חשבון אחר — לא לגעת |
| Vercel | צוות `alma-gads-projects` (alma.gads2010@gmail.com) | פריסה אוטומטית מכל push ל-main. **אין לנו CLI/MCP לצוות הזה** |
| Supabase | ארגון `ALMA-GADS's` · פרויקט `bfgeyufvjjrbqssvekwm` (eu-west-1, free) | נכנס להשהיה אחרי 7 ימים בלי תנועה. **ה-MCP מחובר לארגון אחר** |
| Resend | `alma.ads2010@gmail.com` (חשבון ALMA ADS, משותף לפרויקטים אחרים) | דומיין `alma-ads.co.il`, DNS ב-Cloudflare |

החשבונות של ALMA GADS פתוחים אצל ניב **בחלון אינקוגניטו** של כרום. הפרופיל הרגיל של כרום, ה-Vercel CLI, ה-MCP של Vercel וה-MCP של Supabase — מחוברים לחשבונות האישיים (`almaads-projects`, `almaads2010niv`) ששייכים לפרויקטים אחרים.

## פקודות
```
npm run dev              # פיתוח מקומי
npx tsc --noEmit         # בדיקת טיפוסים
npm run build            # בדיקת האש (Next 16)
git push origin main     # = פריסה לייצור (Vercel של ALMA GADS)
```
אימות פריסה בלי גישה ל-Vercel: `https://api.github.com/repos/ALMA-GADS/country-kiryat-hasharon/commits/<sha>/status` (ציבורי).

## Stack
Next.js 16.1 (App Router) · React 19 · TypeScript · Tailwind v4 · Framer Motion · Phosphor Icons · פונטים Heebo (כותרות) + Assistant (גוף) · Supabase JS · Resend · @vercel/analytics.
פלטה: רקע `#0A0A0A`, כחול `#15A6E0`, ליים `#B4CB15`, זהב קמפיין `#FFD700`.

## כללי ברזל
- **לעולם לא `vercel` CLI מהתיקייה** — `.vercel/project.json` מצביע על הפרויקט הכפול בחשבון האישי (K-01). פריסה = push בלבד.
- **push ל-main = שינוי בדף חי מיד.** אין staging. בנייה ירוקה לפני כל push.
- **אסור להשתמש ב-MCP של Vercel/Supabase לפרויקט הזה.** פעולות בדשבורדים של ALMA GADS = דרך הדפדפן של ניב (אינקוגניטו) או שער-אדם.
- **סודות לעולם לא בקוד/גיט/קבצי זיכרון** — הריפו ציבורי. רק `.env.local` (מוחרג) ו-Vercel env.
- **אין מידע אישי של לידים בקבצי הזיכרון** — רק ספירות ותאריכים. ייצוא לידים — לקובץ מחוץ לריפו.
- **שינוי מבצע = מעבר על כל הדף** (Hero, StickyBar, PricingTable, SavingsCalculator, RiskReversal, HowItWorks, CheckoutForm, ExitIntent, תבנית המייל) — ראה "מפת הדף" ב-MEMORY.md.
- תאריכים ושעות בשעון ישראל עם offset מפורש (`+03:00` קיץ / `+02:00` חורף).
- UI: לוגיים (start/end) בקוד חדש, בדיקת RTL ומובייל על כל שינוי.

## Compact Instructions
בעת קיצור הקשר, שמור תמיד: מספר הסשן הנוכחי מ-SESSION.md · פרטי הקמפיין החי (מחירים, תאריכים, TARGET_DATE) · נתיבי קבצים ששונו · 5 ההנחיות האחרונות של ניב מילה-במילה · באגים שנמצאו וטרם תוקנו · איזה חשבון שייך לאיזה שירות.
