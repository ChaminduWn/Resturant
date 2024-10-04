import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const PayNow = () => {
  const location = useLocation();
  const { cartItems, totalPrice, userId } = location.state;
  const navigate = useNavigate();

  const handlePayment = async (e) => {
    e.preventDefault();
    const paymentDetails = {
      userId,
      cartItems,
      totalPrice,
      paymentInfo: {
        cardName: e.target.cardName.value,
        cardNumber: e.target.cardNumber.value,
        expirationDate: `${e.target.expirationMonth.value}/${e.target.expirationYear.value}`,
        securityCode: e.target.securityCode.value,
      },
    };

    // Send payment details to backend (save in database)
    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentDetails),
      });
      if (response.ok) {
        // Redirect to success page after successful payment
        navigate('/payment-success');

        // history.push("/payment-success", { paymentDetails });
      }
    } catch (error) {
      console.error("Payment failed", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-5 pt-16 pb-10 bg-gray-200 min-w-screen">
      <div className="w-full p-5 mx-auto text-gray-700 bg-white rounded-lg shadow-lg" style={{ maxWidth: "600px" }}>
        <h1 className="text-xl font-bold text-center uppercase">Secure payment info</h1>
        <form onSubmit={handlePayment}>
          <div className="mb-3">
            <label className="mb-2 text-sm font-bold">Name on card</label>
            <input className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md" type="text" name="cardName" required />
          </div>
          <div className="mb-3">
            <label className="mb-2 text-sm font-bold">Card number</label>
            <input className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md" type="text" name="cardNumber" required />
          </div>
          <div className="flex mb-3">
            <div className="w-1/2">
              <label className="mb-2 text-sm font-bold">Expiration Month</label>
              <select className="w-full form-select" name="expirationMonth">
                <option value="01">01 - January</option>
                {/* Add other months here */}
              </select>
            </div>
            <div className="w-1/2">
              <label className="mb-2 text-sm font-bold">Expiration Year</label>
              <select className="w-full form-select" name="expirationYear">
                <option value="2024">2024</option>
                {/* Add more years here */}
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label className="mb-2 text-sm font-bold">Security Code</label>
            <input className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md" type="text" name="securityCode" required />
          </div>
          <div>
            <button type="submit" className="block w-full max-w-xs px-3 py-3 mx-auto font-semibold text-white bg-indigo-500 rounded-lg hover:bg-indigo-700">
              PAY NOW
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PayNow;
