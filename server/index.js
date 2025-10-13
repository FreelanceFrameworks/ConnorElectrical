import express from "express";
import cors from "cors";
import dotenv from "dotenv";

//Stripe
import stripeRoutes from "./routes/stripe.js";
import stripeWebhookRoutes from "./routes/stripe-webhook.js";


// Import routes
import servicesRoutes from "./routes/services.js";
import quotesRoutes from "./routes/quotes.js";
import shiftsRoutes from "./routes/shifts.js";
import notificationsRoutes from "./routes/notifications.js";
import paymentsRoutes from "./routes/payments.js";
import emailRoutes from "./routes/email.js";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();
// Webhook must come before express.json()
app.use("/stripe", stripeWebhookRoutes);

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/stripe", stripeRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/quotes", quotesRoutes);
app.use("/api/shifts", shiftsRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/payments", paymentsRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/auth", authRoutes);
console.log("This is the authentication" + `${authRoutes}`)

console.log("Notifications"+`${notificationsRoutes}`)

// Health check
app.get("/", (req, res) => {
  res.send({ message: "Connors Electrical API running ✅" });
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
