import { Router } from "express";
import { hash as _hash, compare } from "bcryptjs";
const router = Router();

// Example: in-memory store (replace with Firebase/DB)
const users = [];

// POST /auth/signup
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password required" });
    }

    const existing = users.find(u => u.email === email);
    if (existing) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hash = await _hash(password, 10);
    const newUser = { email, passwordHash: hash };
    users.push(newUser);

    res.json({ success: true, user: { email: newUser.email } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const valid = await compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    res.json({ success: true, user: { email: user.email } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ EXPORT the router so index.js can use it
export default router;
