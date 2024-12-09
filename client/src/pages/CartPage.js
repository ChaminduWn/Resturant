import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Fetch cart items for the logged-in user
  const fetchCartItems = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("persist:root"));
      const user = userData && JSON.parse(userData.user)?.currentUser;
      const userId = user?._id;

      if (!userId) {
        alert("User not logged in. Please login to view the cart.");
        navigate("/login");
        return;
      }

      const response = await fetch(`/api/cart/getCart/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCartItems(data.items || []);
      } else {
        console.error("Failed to fetch cart items");
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  // Update the quantity of a cart item
  const updateQuantity = async (itemId, quantity) => {
    if (quantity < 1) {
      alert("Quantity cannot be less than 1");
      return;
    }

    try {
      const response = await fetch(`/api/cart/updateCartItem/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ quantity }),
      });

      if (response.ok) {
        fetchCartItems(); // Reload cart items after updating
      } else {
        console.error("Failed to update cart item");
      }
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  // Navigate to the payment page
  const proceedToPayment = () => {
    navigate("/payment");
  };

  // Fetch cart items on component mount
  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="min-h-screen p-5 bg-gray-100">
      <h2 className="mb-4 text-2xl font-bold">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <li key={item.foodId._id} className="p-4 bg-white rounded-lg shadow">
              <h3 className="text-lg font-semibold">{item.foodId.foodName}</h3>
              <p>Price: LKR {item.foodId.price.toFixed(2)}</p>
              <div className="flex items-center space-x-2">
                <p>Quantity:</p>
                <button
                  className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                  onClick={() => updateQuantity(item.foodId._id, item.quantity - 1)}
                >
                  -
                </button>
                <span className="px-4">{item.quantity}</span>
                <button
                  className="px-2 py-1 text-white bg-green-500 rounded hover:bg-green-600"
                  onClick={() => updateQuantity(item.foodId._id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button
        className="px-6 py-2 mt-6 text-white bg-blue-600 rounded hover:bg-blue-700"
        onClick={proceedToPayment}
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default CartPage;
