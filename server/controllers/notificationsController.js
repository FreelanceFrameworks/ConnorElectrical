// controllers/notificationsController.js
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendSMS = async (req, res) => {
  try {
    const { to, message } = req.body;

    if (!to || !message) {
      return res.status(400).json({ error: "Missing 'to' or 'message' field" });
    }

    const sms = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER, // Must be your Twilio trial number
      to,
    });

    res.json({
      success: true,
      sid: sms.sid,
      message: "SMS sent successfully",
    });
  } catch (error) {
    console.error("Error sending SMS:", error);
    res.status(500).json({ error: error.message });
  }
};
//
