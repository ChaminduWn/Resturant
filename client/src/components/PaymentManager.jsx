import React, { useState, useEffect } from "react";

const PaymentManager = () => {
  const [payments, setPayments] = useState([]);
  const [searchToken, setSearchToken] = useState("");
  const [filteredPayment, setFilteredPayment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Fetch all payments on page load
  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/payment/getallpayment");
        if (response.ok) {
          const data = await response.json();
          setPayments(data);
          setError(null);
        } else {
          throw new Error("Failed to fetch payments");
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
        setError("Error fetching payments");
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  // Handle search by token number
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api/payment/search/${searchToken}`);
      if (response.ok) {
        const payment = await response.json();
        setFilteredPayment(payment);
        setError(null);
      } else {
        setFilteredPayment(null);
        setError("No payment found for this token");
      }
    } catch (error) {
      console.error("Error searching payment by token:", error);
      setError("Error searching payment by token");
    } finally {
      setLoading(false);
    }
  };

  // Handle viewing payment details by payment ID
  const handleViewDetails = async (tokenNumber) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/payment/search/${tokenNumber}`);
      if (response.ok) {
        const payment = await response.json();
        setSelectedPayment(payment);
        setError(null);
      } else {
        setSelectedPayment(null);
        setError("No payment found for this token number");
      }
    } catch (error) {
      console.error("Error fetching payment details:", error);
      setError("Error fetching payment details");
    } finally {
      setLoading(false);
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
              onChange={(e) => {
                setSearchToken(e.target.value);
                setFilteredPayment(null);
              }}
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
        {filteredPayment && (
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
        )}

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* All Payments */}
        <h2 className="mb-4 text-lg font-semibold">All Payments</h2>
        {payments.length > 0 ? (
          <table className="w-full border border-collapse border-gray-300 table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border border-gray-300">Token Number</th>
                <th className="p-2 border border-gray-300">User</th>
                <th className="p-2 border border-gray-300">Total Price</th>
                <th className="p-2 border border-gray-300">Items</th>
                <th className="p-2 border border-gray-300">Actions</th>
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
                  <td className="p-2 text-center border border-gray-300">
                    <button
                      onClick={() => handleViewDetails(payment.tokenNumber)}
                      className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && <p>No payments available.</p>
        )}

        {/* Selected Payment Details */}
        {selectedPayment && (
          <div className="p-4 mt-6 bg-blue-100 rounded-md">
            <h2 className="text-lg font-semibold">Payment Details</h2>
            <div>
              <p><strong>Token Number:</strong> {selectedPayment.tokenNumber}</p>
              <p><strong>User:</strong> {selectedPayment.userId.username} ({selectedPayment.userId.email})</p>
              <p><strong>Total Price:</strong> ${selectedPayment.totalPrice.toFixed(2)}</p>
              <p><strong>Items:</strong></p>
              <ul>
                {selectedPayment.cartItems.map((item, index) => (
                  <li key={index}>{item.foodName} - {item.quantity} x ${item.price.toFixed(2)}</li>
                ))}
              </ul>
              <p><strong>Payment Info:</strong></p>
              <ul>
                <li>Card Type: {selectedPayment.paymentInfo.cardType}</li>
                <li>Card Name: {selectedPayment.paymentInfo.cardName}</li>
                <li>Card Number: {selectedPayment.paymentInfo.cardNumber}</li>
                <li>Expiration Date: {selectedPayment.paymentInfo.expirationDate}</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentManager;