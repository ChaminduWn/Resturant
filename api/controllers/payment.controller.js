import Payment from "../models/Payment.model.js"; // Create a Payment model

export const processPayment = async (req, res, next) => {
  try {
    const { userId, cartItems, totalPrice, paymentInfo } = req.body;

    const payment = new Payment({
      userId,
      cartItems,
      totalPrice,
      paymentInfo,
    });

    await payment.save();
    res.status(200).json({ message: "Payment successful", payment });
  } catch (error) {
    next(error);
  }
};
