import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cartItems: [
    {
      foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, default: 'Pending' }, // Possible values: Pending, Completed, Failed
  paymentDate: { type: Date, default: Date.now }
});

const Payment = mongoose.model('Payment',paymentSchema);
export default Payment;
