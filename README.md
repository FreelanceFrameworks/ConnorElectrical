# ⚡️ ConnorElectrical — Full Stack Mobile & Web App

React Native + Node.js + Stripe + Firebase Ready

A full-stack electrical service management app built for multi-platform deployment (Android, iOS, and Web).
It supports user authentication, one-time + subscription payments via Stripe, and a backend API for scheduling, jobs, and clients.

📁 Monorepo Structure
ConnorElectrical/
│
├── server/          # Node.js + Express backend
│   ├── routes/      # API routes (auth, stripe, etc.)
│   ├── .env         # Backend environment variables (ignored)
│   └── index.js     # Backend entry
│
├── mobile/          # React Native app
│   ├── src/         # Screens, components, hooks
│   ├── android/     # Native Android build
│   ├── ios/         # Native iOS build
│   ├── .env         # Mobile environment variables
│   └── metro.config.js
│
├── .gitignore
└── README.md

🚀 Quick Start
🧩 Prerequisites

Install these globally:

Node.js 22+
npm or yarn
Android Studio (for emulator)
Xcode (for iOS builds)
Git

1️⃣ Clone the Repo
git clone <https://github.com/Chelle77322/ConnorElectrical.git>
cd ConnorElectrical

2️⃣ Backend Setup (Server)
cd server
npm install

Create a .env file:

PORT=5000
STRIPE_SECRET_KEY=your_secret_key_here

Run server:

npm run dev

✅ Server running on: <http://localhost:5000>

Test endpoints:

POST /api/auth/signup

POST /api/auth/login

POST /api/stripe/create-payment

3️⃣ Frontend Setup (Mobile)
cd ../mobile
npm install

Create .env inside /mobile:

API_URL=<http://localhost:5000>
STRIPE_PUBLIC_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXX

Start the bundler:

npx react-native start --reset-cache

Run Android:

npx react-native run-android

Run iOS (macOS only):

npx react-native run-ios

💳 Stripe Integration (Backend)

File: /server/routes/stripe.js

import Stripe from "stripe";
import express from "express";
const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-payment", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // $10.00
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

In /server/index.js:

import stripeRoutes from "./routes/stripe.js";
app.use("/api/stripe", stripeRoutes);

🌐 Web + QR Page (Optional)

You can add a static landing page for QR code access:

// in server/index.js
app.use(express.static("web"));

Host on your domain and generate QR codes linking to it:

npx qrcode-terminal "<https://yourdomain.com>"

🧠 Environment Variable Recap
Folder File Key Description
server .env STRIPE_SECRET_KEY Secret key for Stripe server-side
mobile .env API_URL API base URL for React Native app
mobile .env STRIPE_PUBLIC_KEY Publishable key for client payments
🧱 Build Commands
Android Release AAB
cd mobile/android
./gradlew bundleRelease

iOS Archive

Open in Xcode → Product → Archive → Distribute via App Store.
🧰 Troubleshooting
Issue Fix
require is not defined Use CommonJS syntax in metro.config.js
error exclusionList is not a function Use blockList import in Metro config
Stripe no API key Check .env loading and restart server
Android emulator crashing Wipe AVD data or lower emulator resolution
🔒 Security Best Practices

✅ .env and keystore files are in .gitignore
✅ Never commit private Stripe or Firebase keys
✅ Rotate secrets before going live

🌟 Future Roadmap

🔐 Firebase Auth + Push Notifications

💳 Stripe Pro + One-time payments

📆 Job scheduling dashboard

🌍 Public web portal with QR access

⚙️ CI/CD workflow setup (GitHub Actions)

👩‍💻 Author

Michelle Hall (@FreelanceFrameworks)
Full Stack Engineer — React Native | Node.js | Stripe | Firebase

📧 LinkedIn

💻 GitHub

🪪 License MIT License © 2025 Michelle Hall
