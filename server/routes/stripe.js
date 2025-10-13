// routes/stripe.js
import express from "express";
import Stripe from "stripe";


import dotenv from "dotenv";

dotenv.config();


const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

// Create a one-time payment intent
router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency, metadata } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount, // e.g. 500 for $5.00
      currency: currency || "usd",
      automatic_payment_methods: { enabled: true },
      metadata: metadata || {},
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe error:", error.message);
    res.status(400).json({ error: error.message });
  }
});

export default router;
