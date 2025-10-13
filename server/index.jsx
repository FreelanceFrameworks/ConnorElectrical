/* eslint-disable no-undef */
require("dotenv").config();
import Fastify from "fastify";
import { collection } from "./firebase";
import Stripe from "stripe";
const fastify = Fastify({ logger: true });

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

fastify.register(require("fastify-cors"), { origin: true });

fastify.post("/create-payment-intent", async (req, reply) => {
  try {
    const { amount_cents, currency = "aud", customer, booking } = req.body;

    const pi = await stripe.paymentIntents.create({
      amount: amount_cents,
      currency,
      automatic_payment_methods: { enabled: true },
      metadata: {
        booking_date: booking.date,
        booking_services: JSON.stringify(booking.services),
        customer_name: customer.name,
        customer_email: customer.email,
        customer_phone: customer.phone,
      },
    });

    // Store in Firestore
    await collection("bookings").doc(pi.id).set({
      payment_intent_id: pi.id,
      customer_name: customer.name,
      customer_email: customer.email,
      customer_phone: customer.phone,
      date: booking.date,
      services: booking.services,
      status: "pending",
      amount_cents,
      created_at: admin.firestore.FieldValue.serverTimestamp(),
    });

    reply.send({ clientSecret: pi.client_secret });
  } catch (err) {
    fastify.log.error(err);
    reply.status(500).send({ error: err.message });
  }
});
