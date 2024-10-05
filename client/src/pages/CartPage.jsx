import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    const userData = JSON.parse(localStorage.getItem("persist:root"));
    const user = userData && JSON.parse(userData.user)?.currentUser;
    const userId = user?._id;

    if (!userId) {
      alert("User not logged in. Please login to view the cart.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`/api/cart/getCart/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setCartItems(data.items || []);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      const response = await fetch(`/api/cart/updateCartItem/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ quantity })
      });
      if (response.ok) {
        fetchCartItems(); // Reload cart items after updating
      }
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const proceedToPayment = () => {
    navigate('/payment'); // Navigate to payment page
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (

    <>
           
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.foodId._id}>
              <h3>{item.foodId.foodName}</h3>
              <p>Price: ${item.foodId.price}</p>
              <p>Quantity: 
                <button onClick={() => updateQuantity(item.foodId._id, item.quantity - 1)}>-</button>
                {item.quantity}
                <button onClick={() => updateQuantity(item.foodId._id, item.quantity + 1)}>+</button>
              </p>
            </li>
          ))}
        </ul>
      )}
      <button onClick={proceedToPayment}>Proceed to Payment</button>
    </div>
    </>
  );
}
