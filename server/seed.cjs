// server/seed.js
const admin = require("firebase-admin");
const fs = require("fs");

// Load Firebase service account
//const serviceAccount = require("./serviceAccountKey.json");// Load service account
const serviceAccount = JSON.parse(
  readFileSync(new URL("./serviceAccountKey.json", import.meta.url))
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function runSeed() {
  try {
    /** ---------------- USERS ---------------- */
    const users = [
      {
        id: "user-alice",
        name: "Alice Johnson",
        email: "alice@example.com",
        phone: "+61412345678",
        role: "customer",
      },
      {
        id: "user-electrician",
        name: "ConnorsElectric",
        email: "connor@electrician.com",
        phone: "+61487654321",
        role: "electrician",
      },
    ];

    for (const u of users) {
      await db.collection("users").doc(u.id).set(u);
    }

    /** ---------------- SERVICES ---------------- */
    const services = [
      {
        id: "wiring-installation",
        name: "Wiring Installation",
        description: "New home and renovation wiring installation",
        priceRange: "$500 - $5000",
      },
      {
        id: "lighting-installation",
        name: "Lighting Installation",
        description: "Indoor/outdoor lighting, ceiling fans, downlights",
        priceRange: "$100 - $1000",
      },
      {
        id: "switchboard-upgrade",
        name: "Switchboard Upgrade",
        description: "Modern safety switch and circuit breaker upgrades",
        priceRange: "$800 - $2500",
      },
      {
        id: "power-outlet-repair",
        name: "Power Outlet & Switch Repair",
        description: "Repair or replacement of faulty outlets and switches",
        priceRange: "$80 - $300",
      },
      {
        id: "emergency-electrician",
        name: "Emergency Callouts",
        description: "24/7 urgent electrical repairs",
        priceRange: "$150 - $600",
      },
    ];

    for (const svc of services) {
      await db.collection("services").doc(svc.id).set(svc);
    }

    /** ---------------- BOOKINGS ---------------- */
    const bookings = [
      {
        id: "booking-1",
        userId: "user-alice",
        serviceId: "lighting-installation",
        date: "2025-09-25",
        time: "10:00",
        status: "confirmed",
        notes: "Install 4 downlights in living room",
      },
      {
        id: "booking-2",
        userId: "user-alice",
        serviceId: "switchboard-upgrade",
        date: "2025-09-30",
        time: "14:00",
        status: "pending",
        notes: "Upgrade old fuse box to modern switchboard",
      },
    ];

    for (const b of bookings) {
      await db.collection("bookings").doc(b.id).set(b);
    }

    console.log("✅ Users, services, and bookings seeded!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding Firestore:", err);
    process.exit(1);
  }
}

runSeed();
