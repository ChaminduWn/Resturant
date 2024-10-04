import express from "express";
import { processPayment } from "../controllers/payment.controller.js";

const router = express.Router();

// Route to process payment
router.post("/payment", processPayment);

export default router;
