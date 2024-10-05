import React, { useState, useEffect } from "react";

const PaymentManager = () => {
  const [payments, setPayments] = useState([]);
  const [searchToken, setSearchToken] = useState("");
  const [filteredPayment, setFilteredPayment] = useState(null);

  // Fetch all payments on page load
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch("/api/payment");
        const data = await response.json();
        setPayments(data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };
    fetchPayments();
  }, []);

  // Handle search by token number
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/payment/search/${searchToken}`);
      if (response.ok) {
        const payment = await response.json();
        setFilteredPayment(payment);
      } else {
        setFilteredPayment(null);
        console.error("No payment found for this token");
      }
    } catch (error) {
      console.error("Error searching payment by token:", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-6 py-12 bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-center">Administrator Payment Management</h1>

        {/* Search Section */}
        <form onSubmit={handleSearch} className="mb-6">
          <label className="block mb-2 text-lg font-semibold">Search by Token Number</label>
          <div className="flex">
            <input
              type="number"
              className="w-full p-2 mr-4 border-2 border-gray-300 rounded-md"
              placeholder="Enter Token Number"
              value={searchToken}
              onChange={(e) => setSearchToken(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-700"
            >
              Search
            </button>
          </div>
        </form>

        {/* Search Result */}
        {filteredPayment ? (
          <div className="p-4 mb-6 bg-green-100 rounded-md">
            <h2 className="text-lg font-semibold">Search Result</h2>
            <div>
              <p><strong>Token Number:</strong> {filteredPayment.tokenNumber}</p>
              <p><strong>User:</strong> {filteredPayment.userId.username} ({filteredPayment.userId.email})</p>
              <p><strong>Total Price:</strong> ${filteredPayment.totalPrice.toFixed(2)}</p>
              <p><strong>Items:</strong></p>
              <ul>
                {filteredPayment.cartItems.map((item, index) => (
                  <li key={index}>{item.foodName} - {item.quantity} x ${item.price.toFixed(2)}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-red-500">No payment found for this token number.</p>
        )}

        {/* All Payments */}
        <h2 className="mb-4 text-lg font-semibold">All Payments</h2>
        <table className="w-full border border-collapse border-gray-300 table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border border-gray-300">Token Number</th>
              <th className="p-2 border border-gray-300">User</th>
              <th className="p-2 border border-gray-300">Total Price</th>
              <th className="p-2 border border-gray-300">Items</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index}>
                <td className="p-2 text-center border border-gray-300">{payment.tokenNumber}</td>
                <td className="p-2 border border-gray-300">{payment.userId.username} ({payment.userId.email})</td>
                <td className="p-2 text-center border border-gray-300">${payment.totalPrice.toFixed(2)}</td>
                <td className="p-2 border border-gray-300">
                  <ul>
                    {payment.cartItems.map((item, index) => (
                      <li key={index}>{item.foodName} - {item.quantity} x ${item.price.toFixed(2)}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentManager;
