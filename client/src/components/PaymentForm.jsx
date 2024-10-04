import React, { useState, useEffect } from "react";
import PaymentReview from "./PaymentReview";
import { useNavigate } from "react-router-dom";

export default function PayForm() {
  const [formData, setFormData] = useState({
    paymentId: "",
    email: "",
    phoneNumber: "",
    country: "",
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    postalCode: "",
    agreeTerms: false,
    shippingMethod: "",
  });

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const currentCartList =
      JSON.parse(localStorage.getItem(`cart_${userId}`) || "[]") || [];
    if (currentCartList.length > 0) {
      setCartItems(currentCartList);
      calculateTotal(currentCartList);
    } else {
      // If cart is empty, redirect back to the shopping cart
      navigate("/shoppingCart");
    }
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  const generatePaymentId = () => {
    const randomNumber = Math.floor(Math.random() * 900) + 100; // Generate a random 3-digit number
    return `PAY${randomNumber}`;
  };

  const handleChange = (event) => {
    const { id, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const paymentId = generatePaymentId();
    const paymentData = {
      ...formData,
      paymentId,
      items: cartItems,
      totalPrice,
    };
    console.log("Form Data with Payment ID:", paymentData);

    try {
      const response = await fetch("/api/payments/addPayment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (response.ok) {
        // Clear cart after successful payment
        localStorage.removeItem(`cart_${userId}`);
        alert("Payment successful!");
        navigate("/"); // Redirect to home or order confirmation page
      } else {
        const errorData = await response.json();
        console.error("Payment failed:", errorData);
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during payment:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between px-10 py-4 bg-[#1F1F1F]">
      <div className="w-full px-20 py-4 rounded-lg shadow-md md:w-1/2 ">
        <form onSubmit={handleSubmit}>
          <p className="my-2 font-semibold text-white text-md">Contact</p>
          <div className="mb-6">
            <input
              type="email"
              id="email"
              className="bg-[#1F1F1F] border border-white text-white text-sm rounded-lg focus:ring-[#A80000] focus:border-[#A80000] block w-full p-2.5"
              placeholder="Email"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="tel"
              id="phoneNumber"
              className="bg-[#1F1F1F] border border-white text-white text-sm rounded-lg focus:ring-[#A80000] focus:border-[#A80000] block w-full p-2.5"
              placeholder="Phone Number"
              pattern="[0-9]{10}"
              required
              onChange={handleChange}
            />
          </div>
          <p className="my-2 font-semibold text-white text-md">
            Shipping address
          </p>
          <div className="relative mb-6">
            <select
              id="country"
              className="bg-[#1F1F1F] text-white peer p-4 pe-9 block w-full border-[#A80000] rounded-lg text-sm focus:border-[#A80000] focus:ring-[#A80000]"
              defaultValue={"DEFAULT"}
              onChange={handleChange}
            >
              <option value="DEFAULT" disabled>
                Choose a Country
              </option>
              <option value="Sri Lanka">Sri Lanka</option>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="France">France</option>
              <option value="Germany">Germany</option>
            </select>
            <label className="absolute top-0 h-full p-4 text-white truncate transition duration-100 ease-in-out border border-transparent pointer-events-none start-0">
              Country/Region
            </label>
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <input
                type="text"
                id="firstName"
                className="bg-[#1F1F1F] border border-white text-white text-sm rounded-lg focus:ring-[#A80000] focus:border-[#A80000] block w-full p-2.5"
                placeholder="First Name"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="text"
                id="lastName"
                className="bg-[#1F1F1F] border border-white text-white text-sm rounded-lg focus:ring-[#A80000] focus:border-[#A80000] block w-full p-2.5"
                placeholder="Last Name"
                required
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-6">
            <input
              type="text"
              id="company"
              className="bg-[#1F1F1F] border border-white text-white text-sm rounded-lg focus:ring-[#A80000] focus:border-[#A80000] block w-full p-2.5"
              placeholder="Company (optional)"
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              id="address"
              className="bg-[#1F1F1F] border border-white text-white text-sm rounded-lg focus:ring-[#A80000] focus:border-[#A80000] block w-full p-2.5"
              placeholder="Address"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              id="apartment"
              className="bg-[#1F1F1F] border border-white text-white text-sm rounded-lg focus:ring-[#A80000] focus:border-[#A80000] block w-full p-2.5"
              placeholder="Apartment, suite, etc. (optional)"
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <input
                type="text"
                id="city"
                className="bg-[#1F1F1F] border border-white text-white text-sm rounded-lg focus:ring-[#A80000] focus:border-[#A80000] block w-full p-2.5"
                placeholder="City"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="text"
                id="postalCode"
                className="bg-[#1F1F1F] border border-white text-white text-sm rounded-lg focus:ring-[#A80000] focus:border-[#A80000] block w-full p-2.5"
                placeholder="Postal Code"
                required
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-6">
            <select
              id="shippingMethod"
              className="bg-[#1F1F1F] text-white peer p-4 pe-9 block w-full border-[#A80000] rounded-lg text-sm focus:border-[#A80000] focus:ring-[#A80000]"
              defaultValue={"Standard"}
              onChange={handleChange}
            >
              <option value="Standard">Standard Shipping</option>
              <option value="Express">Express Shipping</option>
            </select>
            <label className="absolute top-0 h-full p-4 text-white truncate transition duration-100 ease-in-out border border-transparent pointer-events-none start-0">
              Shipping Method
            </label>
          </div>
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                id="agreeTerms"
                type="checkbox"
                className="w-4 h-4 border border-[#A80000] rounded bg-[#A80000] focus:ring-3 focus:ring-[#A80000]"
                required
                onChange={handleChange}
              />
            </div>
            <label
              htmlFor="agreeTerms"
              className="text-sm font-medium text-white ms-2"
            >
              I agree with the{" "}
              <a href="#" className="text-[#A80000] hover:underline ">
                terms and conditions
              </a>
              .
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-[#A80000] hover:bg-[#A80000] focus:ring-4 focus:ring-[#A80000] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Complete Payment
          </button>
        </form>
      </div>
      <div className="w-full px-4 py-4 md:w-1/2">
        {/* PaymentReview Component */}
        <PaymentReview cartItems={cartItems} totalPrice={totalPrice} />
      </div>
    </div>
  );
}
