import Stripe from "stripe";
import { sendEmail } from "../services/emailService.js";
import twilio from "twilio";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const createPayment = async (req, res) => {
  try {
    const { amount, email, name, service, date } = req.body;

    // Process payment with Stripe here...

    // Send confirmation email
    await sendEmail(email, "Payment Confirmation", "paymentConfirmation", {
      name,
      amount,
      service,
      date,
      year: new Date().getFullYear(),
    });

    res.json({ success: true, message: "Payment processed & email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};