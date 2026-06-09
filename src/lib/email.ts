import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY ?? "";
const notifyEmail = process.env.LEAD_NOTIFICATION_EMAIL ?? "";
// Use onboarding@resend.dev until alma-ads.co.il domain is verified in Resend.
// TODO: Switch back to process.env.LEAD_FROM_EMAIL after DNS records are added to Cloudflare:
//   1. TXT resend._domainkey  → p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDEhYs9+6P+I0vhi0hSeIyZloVYx3OSlVyu+zbEvPUQlbECU62Fo0plZelwWMh7BfstAAOYpy4gRm1mCC+21bTNKBcX1NHsVv6ss2nfmx8+4m7tGSweVY+tIN2XJKsSXxczrjK55UuMSEzm/asTy+Puh3Yx4J2+Be8GqFvTxTNIOwIDAQAB
//   2. MX  send               → feedback-smtp.eu-west-1.amazonses.com (priority 10)
//   3. TXT send               → v=spf1 include:amazonses.com ~all
const fromEmail = "Country Kiryat HaSharon <onboarding@resend.dev>";

// Resend test-mode restriction: without a verified domain, can only send TO the account owner.
// Using alma.ads2010@gmail.com until alma-ads.co.il is verified.
// TODO: revert to process.env.LEAD_NOTIFICATION_EMAIL after domain verification.
const effectiveNotifyEmail = "alma.ads2010@gmail.com";

export const resend = resendApiKey ? new Resend(resendApiKey) : null;
export const isEmailConfigured = Boolean(resendApiKey && notifyEmail);

export type LeadEmailPayload = {
  name: string;
  phone: string;
  email?: string;
  source?: string;
};

export async function sendLeadEmail(lead: LeadEmailPayload) {
  if (!resend || !isEmailConfigured) return { sent: false, reason: "not-configured" as const };

  const subject = `🎉 ליד חדש ליריד הקיץ — ${lead.name}`;
  const html = `
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head><meta charset="utf-8"><title>${subject}</title></head>
<body style="margin:0;padding:24px;background:#f5f5f5;font-family:-apple-system,'Segoe UI','Heebo',sans-serif;color:#0A0A0A">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:24px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.08)">
    <div style="background:linear-gradient(135deg,#15A6E0,#B4CB15);padding:28px 28px 32px;color:#fff">
      <div style="font-size:13px;font-weight:700;letter-spacing:1.5px;opacity:0.9;text-transform:uppercase">ליד חדש</div>
      <div style="font-size:24px;font-weight:900;margin-top:4px">קאנטרי קריית השרון</div>
      <div style="font-size:14px;margin-top:6px;opacity:0.9">פתיחת מכירות מנוי קיץ 2026 · יריד 27–28.5</div>
    </div>
    <div style="padding:28px">
      <table style="width:100%;border-collapse:collapse;font-size:15px">
        <tr><td style="padding:10px 0;color:#5A7894;width:90px">שם:</td><td style="padding:10px 0;font-weight:700">${escapeHtml(lead.name)}</td></tr>
        <tr style="border-top:1px solid #eee"><td style="padding:10px 0;color:#5A7894">טלפון:</td><td style="padding:10px 0"><a href="tel:${escapeHtml(lead.phone)}" style="color:#15A6E0;font-weight:700;text-decoration:none">${escapeHtml(lead.phone)}</a></td></tr>
        ${lead.email ? `<tr style="border-top:1px solid #eee"><td style="padding:10px 0;color:#5A7894">מייל:</td><td style="padding:10px 0"><a href="mailto:${escapeHtml(lead.email)}" style="color:#15A6E0;text-decoration:none">${escapeHtml(lead.email)}</a></td></tr>` : ""}
        ${lead.source ? `<tr style="border-top:1px solid #eee"><td style="padding:10px 0;color:#5A7894">מקור:</td><td style="padding:10px 0;color:#5A7894;font-size:13px">${escapeHtml(lead.source)}</td></tr>` : ""}
      </table>
      <div style="margin-top:24px;padding-top:20px;border-top:1px solid #eee">
        <a href="tel:${escapeHtml(lead.phone)}" style="display:inline-block;background:#15A6E0;color:#fff;font-weight:900;text-decoration:none;padding:12px 22px;border-radius:12px;font-size:15px">חייגו לליד עכשיו</a>
      </div>
      <p style="margin:18px 0 0;color:#7a8a9a;font-size:12px;line-height:1.5">הליד נשמר אוטומטית גם בבסיס הנתונים. אפשר לראות את כל הלידים ב-Supabase.</p>
    </div>
  </div>
</body>
</html>`.trim();

  const text = [
    `ליד חדש מקאנטרי קריית השרון`,
    `שם: ${lead.name}`,
    `טלפון: ${lead.phone}`,
    lead.email ? `מייל: ${lead.email}` : null,
    lead.source ? `מקור: ${lead.source}` : null,
  ].filter(Boolean).join("\n");

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [effectiveNotifyEmail],
      subject,
      html,
      text,
      replyTo: lead.email || notifyEmail || undefined,
    });
    if (error) {
      console.error("[email] resend error", error);
      return { sent: false, reason: "resend-error" as const, error };
    }
    return { sent: true, id: data?.id };
  } catch (err) {
    console.error("[email] exception", err);
    return { sent: false, reason: "exception" as const, error: err };
  }
}

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
