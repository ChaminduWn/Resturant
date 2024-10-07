// payment controller
import Payment from "../models/Payment.model.js";
import { errorHandler } from "../utils/error.js";

// Save payment details to database
export const savePayment = async (req, res, next) => {
  const { userId, cartItems, totalPrice, paymentInfo, tokenNumber } = req.body;

  try {
    const payment = new Payment({
      userId,
      cartItems,
      totalPrice,
      paymentInfo: {
        ...paymentInfo, // Include cardType from paymentInfo
      },
      tokenNumber,  // Save token number for order identification
    });

    await payment.save();
    res.status(201).json({ message: "Payment successful", payment });
  } catch (error) {
    console.error(error);
    next(errorHandler(500, { message: "Payment failed" }));
  }
};

// Get all payment details (Admin use)
export const getAllPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find().populate("userId", "username email");
    res.status(200).json(payments);
  } catch (error) {
    console.error(error);
    next(errorHandler(500, { message: "Failed to retrieve payment details" }));
  }
};

// Get payment details by token number (Admin use)
export const getPaymentByTokenNumber = async (req, res, next) => {
  const { tokenNumber } = req.params;

  try {
    const payment = await Payment.findOne({ tokenNumber }).populate("userId", "username email");
    if (!payment) {
      return next(errorHandler(404, { message: "No payment found with this token number" }));
    }
    res.status(200).json(payment);
  } catch (error) {
    console.error(error);
    next(errorHandler(500, { message: "Failed to retrieve payment details" }));
  }
};