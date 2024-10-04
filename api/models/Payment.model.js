import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cartItems: [
    {
      foodName: String,
      quantity: Number,
      price: Number,
    },
  ],
  totalPrice: Number,
  paymentInfo: {
    cardName: String,
    cardNumber: String,
    expirationDate: String,
    securityCode: String,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
