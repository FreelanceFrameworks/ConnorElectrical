import express from "express";
import { getShifts, createShift } from "../controllers/shiftsController.js";

const router = express.Router();
router.get("/", getShifts);
router.post("/", createShift);
export default router;
