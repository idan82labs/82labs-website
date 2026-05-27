import { Resend } from "resend";

const CONTACT_TO = process.env.CONTACT_TO_EMAIL || "idan.t@82labs.io";
const CONTACT_FROM = process.env.CONTACT_FROM_EMAIL || "82Labs <contact@82labs.io>";

function sanitize(s: string): string {
  return s.replace(/[<>]/g, "").trim();
}

export async function sendContactFormEmail(data: {
  name: string;
  email: string;
  brief: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !apiKey.startsWith("re_")) {
    console.warn("[email] RESEND_API_KEY missing or invalid — skipping send");
    return false;
  }

  const resend = new Resend(apiKey);

  const safeName = sanitize(data.name);
  const safeEmail = sanitize(data.email);
  const safeBrief = sanitize(data.brief);

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#0f2844;border-bottom:2px solid #7db8e0;padding-bottom:10px">New 82Labs Inquiry</h2>
      <div style="background:#f8f9fa;padding:20px;border-radius:8px;margin:20px 0">
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
      </div>
      <div style="background:#fff;padding:20px;border:1px solid #e5e7eb;border-radius:8px">
        <h3 style="color:#0f2844;margin-top:0">Project Brief</h3>
        <p style="white-space:pre-wrap;line-height:1.6">${safeBrief}</p>
      </div>
    </div>
  `.trim();

  const text = `New 82Labs Inquiry\n\nName: ${safeName}\nEmail: ${safeEmail}\n\nBrief:\n${safeBrief}\n`;

  try {
    const { error } = await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: safeEmail,
      subject: `New Project Inquiry from ${safeName}`,
      text,
      html,
    });
    if (error) {
      console.error("[email] Resend error:", error);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[email] Resend error:", error);
    return false;
  }
}
