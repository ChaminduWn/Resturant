import Payment from '../models/Payment.model.js';
import Cart from '../models/cart.model.js';

export const processPayment = async (req, res) => {
  const { cartItems, totalAmount } = req.body;
  const userId = req.user.id;

  try {
    // Perform actual payment processing logic here (via a payment gateway like Stripe, PayPal, etc.)
    // For this example, we'll assume the payment is successful.

    // Save payment information in the database
    const newPayment = new Payment({
      userId,
      cartItems,
      totalAmount,
      paymentStatus: 'Completed'
    });

    const savedPayment = await newPayment.save();

    // Clear the cart after successful payment
    await Cart.findOneAndDelete({ userId });

    // Generate receipt (as JSON for simplicity)
    const receipt = {
      userId: savedPayment.userId,
      cartItems: savedPayment.cartItems,
      totalAmount: savedPayment.totalAmount,
      paymentDate: savedPayment.paymentDate,
      paymentStatus: savedPayment.paymentStatus
    };

    res.status(200).json(receipt);
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ error: 'Payment processing failed' });
  }
};
