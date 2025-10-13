// controllers/bookingsController.js
import { sendEmail } from "../services/emailService.js";

export const getShifts = async (req, res) => {
  try {
    const snapshot = await db.collection("shifts").get();
    const shifts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(shifts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

export const createShift = async (req, res) => {
  try {
    const { name, email, service, date, time, address } = req.body;

    // Save booking into DB here...

    // Send booking confirmation email
    await sendEmail(email, "Booking Confirmation", "bookingConfirmation", {
      name,
      service,
      date,
      time,
      address,
      year: new Date().getFullYear(),
    });

    res.json({ success: true, message: "Booking created & email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
