import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import sgMail from "@sendgrid/mail";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  brief: z.string().min(10).max(140),
});

const CONTACT_TO = process.env.CONTACT_TO_EMAIL || "idan.t@82labs.io";
const CONTACT_FROM = process.env.CONTACT_FROM_EMAIL || "contact@82labs.com";

function sanitize(s: string): string {
  return s.replace(/[<>]/g, "").trim();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  // Parse + validate
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid form data",
      errors: parsed.error.errors,
    });
  }

  const { name, email, brief } = parsed.data;
  const safeName = sanitize(name);
  const safeEmail = sanitize(email);
  const safeBrief = sanitize(brief);

  // Guard: no SendGrid key
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey || !apiKey.startsWith("SG.")) {
    console.error("SENDGRID_API_KEY missing or invalid");
    return res.status(500).json({
      success: false,
      message: "Email service not configured",
    });
  }

  sgMail.setApiKey(apiKey);

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
    await sgMail.send({
      to: CONTACT_TO,
      from: CONTACT_FROM,
      replyTo: safeEmail,
      subject: `New Project Inquiry from ${safeName}`,
      text,
      html,
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("SendGrid error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
}
