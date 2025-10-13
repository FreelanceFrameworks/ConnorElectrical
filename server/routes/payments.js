import express from "express";
import { createPayment } from "../controllers/paymentsController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Payments route working" });
});

router.post("/create-payment", createPayment);

export default router;
