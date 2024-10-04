import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state;
  const [paymentMethod, setPaymentMethod] = useState("pay-on-delivery");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  const submitPayment = async () => {
    setIsSubmitting(true); // Set loading indicator

    try {
      const paymentData = {
        shippingMethod: formData.selectedMethod,
        paymentId: formData.formData.paymentId,
        email: formData.formData.email,
        phoneNumber: formData.formData.phone,
        firstName: formData.formData.firstName,
        lastName: formData.formData.lastName,
        company: formData.formData.company,
        address: formData.formData.address,
        addressCont: formData.formData.addressCont,
        city: formData.formData.city,
        postalCode: formData.formData.postalCode,
      };

      const response = await axios
        .post("/api/pay/addPayment", paymentData) 
        .then(() => {
          setIsSubmitting(false);
          navigate("/Checkout/payment/success", {
            state: { email: formData.formData.email },
          });
        });
      console.log("Data Added Successfully:", response.data);
    } catch (error) {
      console.error("Failed to add payment shop data:", error);
      setIsSubmitting(false); // Reset loading indicator
      // Handle errors (e.g., display error message to user)
    }
  };

  return (
    <div className="p-4 rounded-md bg-[#1F1F1F]">
      <div className="mb-4 group ">
        <h2 className="py-5 text-xl text-white">Select Payment Method</h2>

        <div className="mb-4 payment-method-group">
          <label className="flex items-center space-x-2 text-white">
            <input
              type="radio"
              id="pay-on-delivery"
              name="payment-method"
              value="pay-on-delivery"
              checked={paymentMethod === "pay-on-delivery"}
              onChange={handlePaymentMethodChange}
              className="w-4 h-4 border-[#A80000] rounded-full focus:ring-2 focus:ring-offset-2 focus:ring-[#A80000]"
            />
            <span className="text-base font-medium">Pay on Delivery</span>
          </label>
        </div>
        <div className="mb-4 payment-method-group">
          <label className="flex items-center space-x-2 text-white">
            <input
              type="radio"
              id="credit-debit-card"
              name="payment-method"
              value="credit-debit-card"
              checked={paymentMethod === "credit-debit-card"}
              onChange={handlePaymentMethodChange}
              className="w-4 h-4 border-[#A80000] rounded-full focus:ring-2 focus:ring-offset-2 focus:ring-[#A80000]"
            />
            <span className="text-base font-medium">Credit/Debit Cards</span>
          </label>
          {paymentMethod === "credit-debit-card" && (
            <div className="card-details mt-4 px-4 py-2 border-[#A80000] rounded-lg shadow-sm">
              <label
                htmlFor="card-number"
                className="block text-sm font-medium text-white mb-2 bg-[#1F1F1F]"
              >
                Card number
              </label>
              <input
                type="text"
                id="card-number"
                placeholder="**** **** **** ****"
                className="w-full px-3 py-2 rounded-lg border border-[#A80000] focus:outline-none focus:ring-[#A80000] focus:ring-[#A80000]  bg-[#1F1F1F]"
              />
              <div className="flex items-center justify-between mt-4">
                <div className="flex space-x-4 border-[#A80000]">
                  <label
                    htmlFor="expiry-date"
                    className="block mb-2 text-sm font-medium text-white text-gray-700"
                  >
                    MM/YY
                  </label>
                  <input
                    type="text"
                    id="expiry-date"
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 rounded-lg border border-[#A80000]focus:outline-none focus:ring-[#A80000] focus:ring-[#A80000]  bg-[#1F1F1F]"
                  />
                  <label
                    htmlFor="cvv"
                    className="block mb-2 text-sm font-medium text-white text-gray-700"
                  >
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    placeholder="CVV"
                    className="w-20 px-3 py-2 rounded-lg border border-[#A80000] focus:outline-none focus:ring-[#A80000] focus:ring-1 bg-[#1F1F1F]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="mb-4 payment-method-group">
          <label className="flex items-center space-x-2 text-white">
            <input
              type="radio"
              id="direct-bank-transfer"
              name="payment-method"
              value="direct-bank-transfer"
              checked={paymentMethod === "direct-bank-transfer"}
              onChange={handlePaymentMethodChange}
              className="w-4 h-4 border-gray-300 rounded-full focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            />
            <span className="text-base font-medium">Direct Bank Transfer</span>
          </label>
        </div>
        <div className="mb-4 payment-method-group">
          <label className="flex items-center space-x-2 text-white">
            <input
              type="radio"
              id="other-payment-methods"
              name="payment-method"
              value="other-payment-methods"
              checked={paymentMethod === "other-payment-methods"}
              onChange={handlePaymentMethodChange}
              className="w-4 h-4 border-gray-300 rounded-full focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            />
            <span className="text-base font-medium">Other Payment Methods</span>
          </label>
          {paymentMethod === "other-payment-methods" && (
            <div className="other-payment-methods-list">
              <img
                src="https://paykoko.com/img/logo1.7ff549c0.png"
                alt="KOKO"
                width={130}
                height={130}
              />
              <img
                src="https://mintpay.lk/_next/image?url=%2Fimg%2Flogo%2Fmintpay-secondary-logo-rgb.webp&w=384&q=75"
                alt="Mintpay"
                width={130}
                height={130}
              />
              <img
                src="data:image/png;base64,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"
                alt="PayZy"
                width={130}
                height={130}
              />
              {/* Add logos for other payment methods here */}
            </div>
          )}
        </div>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        onClick={submitPayment}
        className="text-white bg-[#A80000] hover:bg-[#A80000] focus:ring-4 focus:ring-[#A80000] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Checkout
      </button>
    </div>
  );
}