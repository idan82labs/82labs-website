import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { sendContactFormEmail } from "./email";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  brief: z.string().min(10).max(140),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form — dev-only endpoint (prod uses api/contact.ts Vercel function)
  app.post("/api/contact", async (req, res) => {
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid form data",
        errors: parsed.error.errors,
      });
    }

    const emailSent = await sendContactFormEmail(parsed.data);
    if (!emailSent) {
      return res.status(500).json({
        success: false,
        message: "Failed to send message",
      });
    }

    return res.json({
      success: true,
      message: "Message sent successfully",
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
