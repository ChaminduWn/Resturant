import mongoose from "mongoose";

const shippingSchema = mongoose.Schema({
  shippingMethodName: {
    type: String,
    required: true,
  },
  shippingCost: {
    type: String,
    required: true,
  },
});
const ShippingMethod = mongoose.model("ShippingMethod", shippingSchema);

export default ShippingMethod;