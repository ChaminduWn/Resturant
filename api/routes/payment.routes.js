// payment routes
import express from "express";
import { savePayment, getAllPayments, getPaymentByTokenNumber } from "../controllers/payment.controller.js";

const router = express.Router();

// Route to save a payment
router.post("/savepayment", savePayment);

// Route to get all payments (Admin use only)
router.get("/getallpayment", getAllPayments);

// Route to search payment by token number
router.get("/search/:tokenNumber", getPaymentByTokenNumber);

export default router;
