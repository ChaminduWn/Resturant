import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    paymentId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      required: true,
    },
    apartment: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    termsAndConditions: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    foodName: {
      type: String,
      default: "ISO100 Dymatize ISO100 Hydrolyzed",
    },
    
    description: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "lunch",
    },
    price: {
      type: String,
      default: "",
    },
    shippingMethod: {
      type: String,
      required: true,
      default: "",
    },
    shippingfee: {
      type: String,
      default: "",
    },
    paymentMethod: {
      type: String,
      required: true,
      default: "pay-on-delivery",
    },
    // cardDetails: {
    //   type: {
    //     number: { type: String },
    //     expiry: { type: String },
    //     cvv: { type: String },
    //   },
    //   default: "",
    // },
  },
  { timestamps: true }
);

const PaymentShop = mongoose.model("PaymentShop", paymentSchema);

export default PaymentShop;