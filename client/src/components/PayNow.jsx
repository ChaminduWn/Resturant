import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const PayNow = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { cartItems = [], totalPrice = 0 } = location.state || {};
  const currentUser = useSelector((state) => state.user.currentUser); // Get currentUser from Redux store

  useEffect(() => {
    if (!location.state) {
      navigate('/cart');
    }
  }, [location.state, navigate]);

  const generateTokenNumber = () => {
    return Math.floor(Math.random() * 1000) + 1;
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    const tokenNumber = generateTokenNumber();

    // Check if userId is available
    const userId = currentUser?._id; // Retrieve userId from currentUser

    // Ensure userId is valid before proceeding
    if (!userId) {
      // alert("User ID is not available. Please log in.");
      Toastify({
        text: "User ID is not available. Please log in.",
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        duration: 3000,
        gravity: "top",
        position: "right",
      }).showToast();
      return;
    }

    const paymentDetails = {
      userId,
      cartItems,
      totalPrice,
      paymentInfo: {
        cardType: e.target.cardType.value,
        cardName: e.target.cardName.value,
        cardNumber: e.target.cardNumber.value,
        expirationDate: `${e.target.expirationMonth.value}/${e.target.expirationYear.value}`,
        securityCode: e.target.securityCode.value,
      },
      tokenNumber,
    };

    try {
      const response = await fetch("/api/payment/savepayment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentDetails),
      });

      if (response.ok) {
        Toastify({
          text: "Payment successful!",
          backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
          duration: 3000,
          gravity: "top",
          position: "right",
        }).showToast();
        // alert("Payment successful!");
        const result = await response.json();
        // Redirect to PaymentReceipt page with payment details
        navigate("/payment-receipt", { state: { paymentDetails: result.payment, tokenNumber } });
      } else {
        console.error("Payment failed");
        Toastify({
          text: "Payment failed. Please try again.",
          backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
          duration: 3000,
          gravity: "top",
          position: "right",
        }).showToast();
        // alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment failed", error);
      Toastify({
        text: "An error occurred. Please try again.",
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        duration: 3000,
        gravity: "top",
        position: "right",
      }).showToast();
      // alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-5 pt-16 pb-10 bg-gray-200 min-w-screen">
      <div className="w-full p-5 mx-auto text-gray-700 bg-white rounded-lg shadow-lg" style={{ maxWidth: "600px" }}>
        <h1 className="text-xl font-bold text-center uppercase">Secure payment info</h1>
        <p className="my-3 text-lg font-semibold text-center">Total Price: LKR {totalPrice.toFixed(2)}</p>
        <form onSubmit={handlePayment}>
          <div className="mb-3">
            <label className="mb-2 text-sm font-bold">Card Type</label>
            <select className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md" name="cardType" required>
              <option value="">Select Card Type</option>
              <option value="Visa">Visa</option>
              <option value="MasterCard">MasterCard</option>
              <option value="American Express">American Express</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="mb-2 text-sm font-bold">Name on card</label>
            <input className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md" type="text" name="cardName" required />
          </div>
          <div className="mb-3">
            <label className="mb-2 text-sm font-bold">Card number</label>
            <input className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md" type="text" name="cardNumber" required maxLength="16" pattern="\d{16}" />
          </div>
          <div className="flex mb-3">
            <div className="w-1/2 pr-2">
              <label className="mb-2 text-sm font-bold">Expiration Month</label>
              <select className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md" name="expirationMonth" required>
                <option value="">Month</option>
                <option value="01">01 - January</option>
                <option value="02">02 - February</option>
                <option value="03">03 - March</option>
                <option value="04">04 - April</option>
                <option value="05">05 - May</option>
                <option value="06">06 - June</option>
                <option value="07">07 - July</option>
                <option value="08">08 - August</option>
                <option value="09">09 - September</option>
                <option value="10">10 - October</option>
                <option value="11">11 - November</option>
                <option value="12">12 - December</option>
              </select>
            </div>
            <div className="w-1/2 pl-2">
              <label className="mb-2 text-sm font-bold">Expiration Year</label>
              <select className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md" name="expirationYear" required>
                <option value="">Year</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
                <option value="2030">2030</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label className="mb-2 text-sm font-bold">Security Code</label>
            <input className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md" type="text" name="securityCode" required maxLength="3" pattern="\d{3}" />
          </div>
          <button type="submit" className="w-full py-2 mt-4 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-700">Pay Now</button>
        </form>
      </div>
    </div>
  );
};

export default PayNow;
