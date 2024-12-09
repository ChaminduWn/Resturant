import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useSelector, useDispatch } from "react-redux";
import { updateCart, removeItemFromCart } from "../redux/actions"; // Replace with your actual Redux actions

const ShoppingCart = () => {
  const { cartItems, userId } = useSelector((state) => ({
    cartItems: state.cart.items,
    userId: state.user.currentUser?._id,
  }));
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (cartItems.length > 0) {
      calculateTotal(cartItems);
    }
  }, [cartItems]);

  const calculateTotal = (items) => {
    // Calculate total price of items in the cart
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const updateQuantity = (id, delta) => {
    // Update the quantity of items in the cart
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + delta } : item
    );
    const filteredCart = updatedCart.filter((item) => item.quantity > 0);
    dispatch(updateCart(filteredCart)); // Dispatch updated cart to Redux store
  };

  const removeItem = (id) => {
    // Remove an item from the cart
    dispatch(removeItemFromCart(id)); // Dispatch item removal to Redux store
  };

  const handleOrderNow = () => {
    // Navigate to the payment page with cart items and total price
    navigate("/checkout/payment", { state: { cartItems, totalPrice, userId } });
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
                <span className="text-lg font-semibold"> LKR {item.price}</span>
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
            <span className="text-lg font-semibold">LKR {totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-end mt-4">
            <button 
              onClick={handleOrderNow} 
              className="bg-[#4c0000] hover:bg-[#7e1010] text-white py-2 px-4 rounded-md"
            >
              Order Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
