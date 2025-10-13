import { db } from "../config/firebase.js";

// GET all quotes
export const getQuotes = async (req, res) => {
  try {
    const snapshot = await db.collection("quotes").get();
    const quotes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(quotes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quotes" });
  }
};

// POST new quote request
export const createQuote = async (req, res) => {
  try {
    const { customerName, email, phone, serviceId, details } = req.body;

    if (!customerName || !email || !serviceId)
      return res.status(400).json({ error: "Missing required fields" });

    const docRef = await db.collection("quotes").add({
      customerName,
      email,
      phone,
      serviceId,
      details,
      status: "pending",
      createdAt: new Date(),
    });

    res.status(201).json({ id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: "Failed to create quote" });
  }
};
