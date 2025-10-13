// services/emailService.js
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// Create transporter with OAuth2
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_FROM,
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    accessToken: process.env.GMAIL_ACCESS_TOKEN, // optional
  },
});

// Setup handlebars options
const __dirname = path.resolve();

const handlebarOptions = {
  viewEngine: {
    extname: ".hbs",
    layoutsDir: path.join(__dirname, "views/email/layouts"),
    defaultLayout: "main",
    partialsDir: path.join(__dirname, "views/email/partials"),
  },
  viewPath: path.join(__dirname, "views/email/templates"),
  extName: ".hbs",
};

// Attach handlebars plugin
transporter.use("compile", hbs(handlebarOptions));

/**
 * Send templated email
 * @param {string} to - Recipient email
 * @param {string} subject - Subject line
 * @param {string} template - Template name (filename without extension)
 * @param {object} context - Dynamic data passed into template
 */
export const sendEmail = async (to, subject, template, context = {}) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      template,
      context,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);

    return info;
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw error;
  }
};
