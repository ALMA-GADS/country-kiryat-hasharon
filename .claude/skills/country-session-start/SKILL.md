---
name: country-session-start
description: פתיחת סשן עבודה על דף הנחיתה של קאנטרי קריית השרון (country-kiryat-hasharon). טוען הקשר (CLAUDE, MEMORY, SESSION, PROJECT_STORY), מריץ בדיקת אש (גיט, בנייה, ייצור, פריסה אחרונה, Supabase, Resend, תוקף הטיימר), מזהה את הסשן הבא, מצהיר על שערי-אדם, מציג פרומפט מוכן ומחכה לאישור לפני שורת קוד. השתמש ב-/country-session-start (או "נמשיך עם דף הקאנטרי") בתחילת כל סשן. אל תשתמש לפרויקטים אחרים — גם לא ל-country-club-shifts.
---

# country-session-start — פתיחת סשן לדף הקאנטרי

> עותק-אמת: `country-kiryat-hasharon\.claude\skills\` (בריפו) · מראה: `~\.claude\skills\` (כדי שיעבוד גם כשהסשן נפתח מתיקיית Cursor). שינוי בסקיל = לעדכן את שני העותקים.

## מתי להפעיל
- ניב כותב `/country-session-start` או `/country-start`, או "נמשיך עם דף הקאנטרי / קריית השרון"
- תחילת כל סשן חדש על `C:\Users\USER\Downloads\Cursor\country-kiryat-hasharon`
- לעולם לא לפרויקטים אחרים (ל-My Special Offer, לרי-קול ולסיגנלס יש סקילים נפרדים)

## מה לעשות

### שלב א׳ — קריאת הקשר (חובה, בסדר הזה)
1. `C:\Users\USER\Downloads\Cursor\country-kiryat-hasharon\CLAUDE.md` — כללי הברזל ומפת החשבונות
2. `C:\Users\USER\Downloads\Cursor\country-kiryat-hasharon\MEMORY.md` — מצב טכני, מפת הדף, מוקשים ממוספרים (K-xx), עבודה פתוחה
3. `C:\Users\USER\Downloads\Cursor\country-kiryat-hasharon\SESSION.md` — טבלת הסשנים, "מצב נוכחי", הסשן הבא והפרומפט שלו
4. `C:\Users\USER\Downloads\Cursor\country-kiryat-hasharon\PROJECT_STORY.txt` — לפחות שני הסשנים האחרונים
5. `C:\Users\USER\Downloads\Cursor\country-kiryat-hasharon\NIV_PROMPTS_IDEAS.md` — הסעיף האחרון + רעיונות פתוחים

### שלב ב׳ — זיהוי הסשן הבא
1. ב-SESSION.md מצא את הסשן הראשון בטבלה עם `⏳ ממתין` (אם יש `🚧` — הוא קודם לכל השאר).
2. קרא את הסעיף המלא שלו: מטרה, תכולה, קבצים לקריאה, קריטריוני הצלחה (כהדגמות), שער-אדם, פרומפט מוכן.

### שלב ג׳ — בדיקת אש (כל סעיף עובר או מדווח כתקלה — לא מדלגים)
```bash
P="C:/Users/USER/Downloads/Cursor/country-kiryat-hasharon"
git -C "$P" status --short
git -C "$P" fetch -q origin && git -C "$P" status -sb | head -1     # ahead/behind מול origin/main
git -C "$P" log --oneline -3
curl -s -o /dev/null -w "prod: %{http_code}\n" https://country-kiryat-hasharon.vercel.app/
curl -s "https://api.github.com/repos/ALMA-GADS/country-kiryat-hasharon/commits/$(git -C "$P" rev-parse origin/main)/status" \
  | python -c "import sys,json; d=json.load(sys.stdin); print('vercel deploy of origin/main:', d.get('state'))"
nslookup bfgeyufvjjrbqssvekwm.supabase.co 1.1.1.1 2>&1 | tail -2     # NXDOMAIN = הפרויקט מושהה
grep -o 'TARGET_DATE = "[^"]*"' "$P/src/components/Hero.tsx"
```
מצב הדומיין ב-Resend (המפתח נקרא מ-.env.local ולא מודפס לעולם):
```bash
cd "C:/Users/USER/Downloads/Cursor/country-kiryat-hasharon" && python -c "import json,urllib.request;k=[l.split('=',1)[1].strip() for l in open('.env.local') if l.startswith('RESEND_API_KEY=')][0];r=urllib.request.Request('https://api.resend.com/domains/2fc6df44-5e18-4a37-ad83-d1577390013f',headers={'Authorization':'Bearer '+k,'User-Agent':'curl/8'});print('resend domain:',json.load(urllib.request.urlopen(r))['status'])"
```
בנייה (רק אם יש קוד שהשתנה מאז הסשן הקודם או שהעץ לא נקי — אחרת מספיק הסטטוס של Vercel):
```bash
cd "C:/Users/USER/Downloads/Cursor/country-kiryat-hasharon" && npm run build 2>&1 | tail -15
```
דגלים אדומים שמדווחים **לפני** כל תוכנית:
- הייצור לא מחזיר 200, או שהפריסה של origin/main לא `success`
- Supabase מחזיר NXDOMAIN → הלידים לא נשמרים במסד (רק מייל). דורש שער-אדם: ניב מפעיל את הפרויקט בדשבורד של ALMA-GADS
- דומיין Resend לא `verified` → מיילים לניב ייחסמו
- `TARGET_DATE` עבר → הדף מציג קמפיין שפג. לשאול את ניב מה הקמפיין הנוכחי
- קומיטים שלא נדחפו / שינויים לא מקומטים מסשן קודם

### שלב ד׳ — סיכום (עד 150 מילים)
1. **מצב הדף:** קמפיין פעיל או פג, מה עובד בייצור, צינור הלידים (Supabase / Resend / יעד המייל)
2. **הסשן הבא:** מספר + כותרת + זמן משוער
3. **מטרה:** שני משפטים
4. **שער-אדם:** מה יידרש מניב ומתי (חומרי קמפיין, גרפיקה, הפעלת Supabase, ליד בדיקה אמיתי, פעולה בחלון האינקוגניטו)
5. **קריטריוני הצלחה:** 3–5, כהדגמות
6. **תוצאות בדיקת האש:** שורה לכל בדיקה

### שלב ה׳ — הפרומפט המוכן
הצג את הפרומפט מסעיף הסשן ב-SESSION.md בבלוק קוד, כלשונו. אם ניב ביקש משהו אחר מהמתוכנן — זה תקף; ציין שהתוכנית ב-SESSION.md תתעדכן בסגירה.

### שלב ו׳ — המתנה לאישור
**אסור לכתוב קוד.** חכה ל:
- "בצע" / "המשך" / "אוקיי" → התחל את הסשן
- בקשת תיקון → עדכן את התוכנית והצג שוב
- דילוג לסשן אחר → עדכן את טבלת הסטטוס באישור

## כללי ברזל
1. **אסור קוד לפני אישור.** הסקיל הוא הכנה בלבד.
2. **אם MEMORY.md או SESSION.md חסרים** — עצור והתרע.
3. **הכל על חשבונות ALMA GADS** (GitHub ALMA-GADS · Vercel alma-gads-projects · Supabase ALMA-GADS's). ה-MCP של Vercel ושל Supabase מחוברים לחשבונות האישיים — **אסור להשתמש בהם לפרויקט הזה**.
4. **אסור להריץ `vercel` CLI מהתיקייה** — `.vercel/project.json` מצביע על הפרויקט הכפול בחשבון האישי (מוקש K-01). פריסה = `git push origin main` בלבד.
5. **דחיפה ל-main = פריסה לייצור מיידית.** אין סביבת staging.
6. **עברית בכל התקשורת עם ניב.**
