---
name: country-checkpoint
description: נקודת ביקורת אמצע-סשן בדף הנחיתה של קאנטרי קריית השרון. שומרת התקדמות בלי לסגור את הסשן — בדיקת טיפוסים ובנייה, קמיט wip מקומי, ודחיפה רק באישור (כי דחיפה ל-main = פריסה מיידית לייצור) — בלי עדכון קבצי זיכרון ובלי סימון הסשן כהושלם. השתמש ב-/country-checkpoint באמצע סשן ארוך, לפני שלב מסוכן, או כשההקשר עומד להידחס. אל תשתמש לפרויקטים אחרים.
---

# country-checkpoint — נקודת ביקורת אמצע סשן

> עותק-אמת: `country-kiryat-hasharon\.claude\skills\` (בריפו) · מראה: `~\.claude\skills\` (כדי שיעבוד גם כשהסשן נפתח מתיקיית Cursor). שינוי בסקיל = לעדכן את שני העותקים.

## מתי להפעיל
- ניב כותב `/country-checkpoint`
- באמצע סשן ארוך, אחרי השלמת שלב מבין כמה
- לפני שינוי מסוכן (החלפת מבצע, שינוי טופס/API) — כדי שתהיה נקודת חזרה
- כשההקשר עומד להידחס
- לעולם לא כתחליף ל-`/country-session-end`

## מה לעשות

### שלב א׳ — טיפוסים ובנייה
```bash
cd "C:/Users/USER/Downloads/Cursor/country-kiryat-hasharon"
npx tsc --noEmit 2>&1 | tail -10
npm run build 2>&1 | tail -15
```
כושל → **עצור, תקן, נסה שוב.** אין checkpoint על קוד שבור.

### שלב ב׳ — מצב גיט
```bash
git status --short
git diff --stat
```
הצג לניב את רשימת הקבצים. ודא שאין קבצים שלא שייכים לקמיט (`.env.local`, צילומי מסך, קבצי בדיקה, אקסלים עם לידים).

### שלב ג׳ — קמיט חלקי (מקומי)
```bash
git add -A
git status --short
git commit -m "wip(session-N): [תיאור השלב] — checkpoint

- [מה שונה]
- עבודה בתהליך — ממשיכים בהמשך הסשן

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```
המחבר חייב להיות `Niv <alma.ads2010@gmail.com>` (מוגדר מקומית בריפו) — לא לשנות.

### שלב ד׳ — דחיפה = פריסה לייצור (רק באישור)
שאל את ניב: **"לדחוף עכשיו? דחיפה ל-main מעלה מיד לייצור את מה שיש — או להשאיר מקומי עד הסגירה?"**
אם אישר:
```bash
git push origin main
```
ואחרי ~90 שניות ודא שהפריסה הצליחה ושהדף חי:
```bash
P="C:/Users/USER/Downloads/Cursor/country-kiryat-hasharon"
curl -s "https://api.github.com/repos/ALMA-GADS/country-kiryat-hasharon/commits/$(git -C "$P" rev-parse HEAD)/status" \
  | python -c "import sys,json; d=json.load(sys.stdin); print('vercel deploy:', d.get('state'))"
curl -s -o /dev/null -w "prod: %{http_code}\n" https://country-kiryat-hasharon.vercel.app/
```
push נדחה? `git pull --rebase origin main` → בנייה → push. **לעולם לא `--force`.**
**לעולם לא `vercel` CLI** — הקישור המקומי מצביע על הפרויקט הכפול (K-01).

### שלב ה׳ — דוח קצר
```markdown
## ✅ נקודת ביקורת שמורה
- **קמיט:** [hash] (מקומי / נדחף)
- **קבצים:** [N] שונו
- **טיפוסים + בנייה:** ✅
- **ייצור:** [✅ עלה ונבדק / ⏳ יעלה בסגירה]

ממשיכים ל: [השלב הבא בתוך הסשן]
```

## כללי ברזל
1. **אל תעדכן MEMORY / PROJECT_STORY / NIV_PROMPTS / SESSION** — שמור ל-`/country-session-end`.
2. **אל תסמן את הסשן ✅** — הוא בתהליך.
3. **קמיט חייב "wip".**
4. **בנייה כושלת = עצור.**
5. **דחיפה רק באישור מפורש** — היא פריסה לייצור של דף חי.
6. **עברית בתקשורת, קמיטים באנגלית.**
