// server/firebase.js
const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), 
    // OR use serviceAccountKey.json:
    // credential: admin.credential.cert(require("./serviceAccountKey.json"))
  });
}

const db = admin.firestore();

module.exports = db;
