import { db } from "../config/firebase.js";

// GET all services
export const getAllServices = async (req, res) => {
  try {
    const snapshot = await db.collection("services").get();
    const services = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch services" });
  }
};

// POST new service
export const createService = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    if (!name || !price) return res.status(400).json({ error: "Missing fields" });

    const docRef = await db.collection("services").add({
      name, description, price, createdAt: new Date(),
    });

    res.status(201).json({ id: docRef.id, name, description, price });
  } catch (error) {
    res.status(500).json({ error: "Failed to create service" });
  }
};
