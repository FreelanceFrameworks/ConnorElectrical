// config/stripe.js
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("⚠️ Missing STRIPE_SECRET_KEY in .env");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-01-27.acacia", // ✅ latest as of 2025
});

export default stripe;
