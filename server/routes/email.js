// routes/email.js
import express from "express";
import nodemailer from "nodemailer";
import { google } from "googleapis";

const router = express.Router();

router.post("/send", async (req, res) => {
  const { to, subject, template, context } = req.body;

  try {
    // Load credentials from .env
    const clientId = process.env.GMAIL_CLIENT_ID;
    const clientSecret = process.env.GMAIL_CLIENT_SECRET;
    const refreshToken = process.env.GMAIL_REFRESH_TOKEN;
    const user = process.env.GMAIL_USER;

    console.log("🔑 Loaded ENV values:");
    console.log("CLIENT_ID:", clientId ? clientId.substring(0, 12) + "..." : "MISSING");
    console.log("CLIENT_SECRET:", clientSecret ? clientSecret.substring(0, 6) + "..." : "MISSING");
    console.log("REFRESH_TOKEN:", refreshToken ? refreshToken.substring(0, 20) + "..." : "MISSING");
    console.log("USER:", user || "MISSING");

    // Init OAuth2 client
    const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, "https://developers.google.com/oauthplayground");
    oAuth2Client.setCredentials({ refresh_token: refreshToken });

    console.log("🔄 Requesting new access token...");
    const accessToken = await oAuth2Client.getAccessToken();

    if (!accessToken || !accessToken.token) {
      console.error("❌ Failed to get access token");
      return res.status(500).json({ success: false, error: "Failed to get access token" });
    }

    console.log("✅ Got access token:", accessToken.token.substring(0, 20) + "...");

    // Create transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user,
        clientId,
        clientSecret,
        refreshToken,
        accessToken: accessToken.token,
      },
    });

    // Example template handling
    const html = `<h1>Hello ${context?.name || "there"}</h1><p>This is a test email.</p>`;

    const mailOptions = {
      from: `Your App <${user}>`,
      to,
      subject,
      html,
    };

    console.log("📧 Sending email to:", to);
    const result = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent:", result.messageId);

    res.json({ success: true, messageId: result.messageId });
  } catch (error) {
    console.error("❌ Error in /send route:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
