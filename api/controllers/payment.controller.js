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

export const updatePayment = async (req, res, next) => {
  const { paymentId } = req.params;
  const { isChecked } = req.body;

  try {
    // Check if `isChecked` is provided
    if (typeof isChecked === 'undefined') {
      return next(errorHandler(400, { message: "isChecked field is required" }));
    }

    // Find the payment record by ID
    const payment = await Payment.findById(paymentId);
    
    // Handle payment not found scenario
    if (!payment) {
      return next(errorHandler(404, { message: "Payment not found" }));
    }

    // Update the payment status
    payment.isChecked = isChecked;

    // Save the updated payment
    const updatedPayment = await payment.save();

    // Return successful response with updated payment data
    res.status(200).json({ 
      message: "Payment status updated successfully", 
      payment: updatedPayment 
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error updating payment:", error);
    
    // Forward the error to the error handler middleware
    next(errorHandler(500, { message: "Failed to update payment" }));
  }
};

// Delete payments older than a specified number of days
export const deleteOldPayments = async (req, res, next) => {
  const { days } = req.body; // Number of days from the current date

  if (typeof days !== 'number' || days < 0) {
    return next(errorHandler(400, { message: "Invalid number of days provided" }));
  }

  try {
    // Get the current date in SLST timezone
    const currentDate = new Date();
    const slstOffset = 5.5 * 60 * 60 * 1000; // Sri Lanka Standard Time is UTC+5:30
    const slstDate = new Date(currentDate.getTime() + slstOffset);

    // Calculate the cutoff date
    const cutoffDate = new Date(slstDate.getTime() - days * 24 * 60 * 60 * 1000);

    // Delete payments older than the cutoff date
    const result = await Payment.deleteMany({ createdAt: { $lt: cutoffDate } });

    res.status(200).json({
      message: `${result.deletedCount} payment(s) deleted successfully.`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error("Error deleting old payments:", error);
    next(errorHandler(500, { message: "Failed to delete old payments" }));
  }
};
