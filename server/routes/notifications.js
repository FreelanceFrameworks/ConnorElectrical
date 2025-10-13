// routes/notifications.js
import express from "express";
import { sendSMS } from "../controllers/notificationsController.js";
import { sendEmail } from "../config/email.js";


const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Notifications route working" });
});

router.post("/send-sms", sendSMS);

router.post("/send-sms", (req, res) => {
         res.json({message: "SMS sent", sendSMS})
     });
router.post("/send-email", async (req, res) => {
  try {
    const { to, subject, message } = req.body;
    const info = await sendEmail(to, subject, message);
    res.json({ success: true, info });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
export default router;