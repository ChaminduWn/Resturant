import React, { useEffect, useState } from 'react';

export default function PaymentPage() {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchCartItems = async () => {
    try {
      const response = await fetch('/api/cart/getCart', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setCartItems(data.cartItems);
      setTotalAmount(data.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0));
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const handlePayment = async () => {
    try {
      const response = await fetch('/api/payment/processPayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ cartItems, totalAmount })
      });
      if (response.ok) {
        const receipt = await response.json();
        alert('Payment successful!');
        // Download receipt
        const blob = new Blob([JSON.stringify(receipt)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'receipt.json';
        link.click();
      } else {
        alert('Payment failed');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div>
      <h2>Payment</h2>
      <p>Total Amount: ${totalAmount}</p>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}
