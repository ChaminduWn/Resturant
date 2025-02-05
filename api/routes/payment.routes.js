// payment.routes.js
import express from "express";
import { 
  savePayment, 
  getAllPayments, 
  getPaymentByTokenNumber, 
  updatePayment, 
  deleteOldPayments 
} from "../controllers/payment.controller.js";

const router = express.Router();

// Route to save a payment
router.post("/savepayment", savePayment);

// Route to get all payments (Admin use only)
router.get("/getallpayment", getAllPayments);

// Route to search payment by token number
router.get("/search/:tokenNumber", getPaymentByTokenNumber);

// Route to update payment status
router.put('/update/:paymentId', updatePayment);

// Route to delete payments older than a specified number of days
router.delete('/deleteold', deleteOldPayments);

export default router;
