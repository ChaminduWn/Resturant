import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const currentCartList =
      JSON.parse(localStorage.getItem(`cart_${userId}`) || "[]") || [];
    if (currentCartList.length > 0) {
      setCartItems(currentCartList);
      calculateTotal(currentCartList);
    }
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  const updateQuantity = (id, delta) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + delta } : item
    );
    const filteredCart = updatedCart.filter((item) => item.quantity > 0);
    setCartItems(filteredCart);
    calculateTotal(filteredCart);
    updateLocalStorage(filteredCart);
  };

  const updateLocalStorage = (updatedCart) => {
    localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    calculateTotal(updatedCart);
    updateLocalStorage(updatedCart);
  };

  return (
    <div className="container py-12 mx-auto">
      <h2 className="mb-8 text-2xl font-semibold">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div>Your cart is currently empty.</div>
      ) : (
        <div className="flex flex-col">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center mb-6">
              <img
                className="object-cover w-20 h-20 mr-4 rounded-lg"
                src={item.image}
                alt={item.foodName}
              />
              <div className="flex flex-col">
                <span className="text-lg font-medium">{item.foodName}</span>
                <span className="text-lg font-semibold">${item.price}</span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-4 font-medium text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
              <div className="ml-auto">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  disabled={item.quantity === 1}
                  className="px-3 py-2 bg-gray-200 rounded"
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="px-3 py-2 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between pt-6 border-t">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-lg font-semibold">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-end mt-4">
            <Link
              to={{
                pathname: "/checkout/payment",
                state: { cartItems, totalPrice, userId },
              }}
            >
              <button className="bg-[#4c0000] hover:bg-[#7e1010] text-white py-2 px-4 rounded-m">
                Order Now
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
