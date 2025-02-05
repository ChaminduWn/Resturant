import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Import the AutoTable plugin

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
    if (!searchToken) {
      setError("Please enter a valid token number.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/payment/search/${searchToken}`);
      if (response.ok) {
        const payment = await response.json();
        setFilteredPayment(payment);
        setError(null);
      } else {
        setFilteredPayment(null);
        setError("No payment found for this token.");
      }
    } catch (error) {
      console.error("Error searching payment by token:", error);
      setError("Error searching payment by token.");
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
        setError("No payment found for this token number.");
      }
    } catch (error) {
      console.error("Error fetching payment details:", error);
      setError("Error fetching payment details.");
    } finally {
      setLoading(false);
    }
  };

  // Handle checkbox change to update payment status and show toast notification
  const handleCheckboxChange = async (paymentId, newStatus) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/payment/update/${paymentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isChecked: newStatus }),
      });

      if (response.ok) {
        const updatedPayment = await response.json();
        setPayments((prevPayments) =>
          prevPayments.map((payment) =>
            payment._id === paymentId ? updatedPayment : payment
          )
        );
        toast.success("Payment status updated successfully!");

        // Refresh the page after a short delay (e.g., 1 second)
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        console.error(
          "Failed to update payment:",
          response.status,
          response.statusText
        );
        toast.error("Failed to update payment status.");
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
      toast.error("Error updating payment status.");
    } finally {
      setLoading(false);
    }
  };


  
// Delete payments older than a specified number of days
 const deleteOldPayments = async (req, res, next) => {
  const { days } = req.body; // Number of days from the current date

  if (typeof days !== 'number' || days < 0) {
    return next(errorHandler(400, { message: "Invalid number of days provided" }));
  }

  try {
    // Get the current date in SLST timezone
    const currentDate = new Date();
    const slstOffset = 5.5 * 60 * 60 * 1000; // Sri Lanka Standard Time is UTC+5:30
    const slstDate = new Date(currentDate.getTime() + slstOffset);

    // Calculate the cutoff date
    const cutoffDate = new Date(slstDate.getTime() - days * 24 * 60 * 60 * 1000);

    // Delete payments older than the cutoff date
    const result = await Payment.deleteMany({ createdAt: { $lt: cutoffDate } });

    res.status(200).json({
      message: `${result.deletedCount} payment(s) deleted successfully.`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error("Error deleting old payments:", error);
    next(errorHandler(500, { message: "Failed to delete old payments" }));
  }
};
  // // Function to generate PDF
  // const generatePDF = () => {
  //   const doc = new jsPDF();
  //   doc.setFontSize(12);
    
  //   // Filter payments to only include those that are checked (complete)
  //   const completedPayments = payments.filter(payment => payment.isChecked);

  //   if (completedPayments.length === 0) {
  //     toast.warn("No completed payments to generate PDF.");
  //     return;
  //   }

  //   // Title
  //   doc.text("Completed Payments", 20, 20);

  //   // Generate table
  //   const tableColumn = [
  //     "Token Number",
  //     "User",
  //     "Total Price",
  //     "Items"
  //   ];
  //   const tableRows = completedPayments.map(payment => {
  //     return [
  //       payment.tokenNumber,
  //       payment.userId ? `${payment.userId.username} (${payment.userId.email})` : "N/A",
  //       `$${payment.totalPrice?.toFixed(2)}`,
  //       payment.cartItems?.map(item => `${item.foodName} (${item.quantity} x $${item.price?.toFixed(2)})`).join(", ") || "No items"
  //     ];
  //   });

  //   // Create the table in the PDF
  //   doc.autoTable(tableColumn, tableRows, { startY: 30 });

  //   // Save the PDF
  //   doc.save("completed_payments.pdf");
  // };

  // Function to generate PDF
  const UncompletePayments = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
  
    // Title
    doc.text("Incomplete Payment Details", 14, 20);
  
    // Filter to get only uncompleted payments
    const uncompletedPayments = payments.filter(payment => !payment.isChecked);
  
    // Check if there are no incomplete payments
    if (uncompletedPayments.length === 0) {
      doc.text("No incomplete payments available.", 14, 30);
      doc.save("incomplete_payments.pdf");
      return;
    }
  const totalPrice = uncompletedPayments.reduce((sum, payment) => sum + payment.totalPrice, 0);

    // Prepare data for the table
    const tableData = uncompletedPayments.map(payment => ({
      tokenNumber: payment.tokenNumber,
      user: payment.userId ? `${payment.userId.username} (${payment.userId.email})` : "N/A",
      totalPrice: `$${payment.totalPrice?.toFixed(2)}`,
      items: payment.cartItems?.map(item => `${item.foodName} - ${item.quantity} x $${item.price?.toFixed(2)}`).join(", ") || "No items"
      
    }));
    

  
    // Define the columns for the table
    
    const columns = [
      
      { header: "Token Number", dataKey: "tokenNumber" },
      { header: "User", dataKey: "user" },
      { header: "Total Price", dataKey: "totalPrice" },
      { header: "Items", dataKey: "items" }
    ];
  
    // Generate the table
    doc.autoTable({
      head: [columns.map(col => col.header)],
      body: tableData.map(payment => columns.map(col => payment[col.dataKey])),
      startY: 30, // Start below the title
      theme: "grid" // You can choose other themes as well
    });

    doc.text(`Total Price of not Completed Payments: $${totalPrice.toFixed(2)}`,14, 25);
   
    // Save the PDF
    doc.save("incomplete_payments.pdf");
  };



  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    
    // Filter payments to only include those that are checked (complete)
    const completedPayments = payments.filter(payment => payment.isChecked);
  
    if (completedPayments.length === 0) {
      toast.warn("No completed payments to generate PDF.");
      return;
    }
  
    // Calculate total price of completed payments
    const totalPrice = completedPayments.reduce((sum, payment) => sum + payment.totalPrice, 0);
  
    // Title
    doc.text("Completed Payments", 20, 20);
  
    // Add Total Price
    doc.text(`Total Price of Completed Payments: $${totalPrice.toFixed(2)}`, 20, 30);
  
    // Generate table
    const tableColumn = [
      "Token Number",
      "User",
      "Total Price",
      "Items"
    ];
    const tableRows = completedPayments.map(payment => {
      return [
        payment.tokenNumber,
        payment.userId ? `${payment.userId.username} (${payment.userId.email})` : "N/A",
        `$${payment.totalPrice?.toFixed(2)}`,
        payment.cartItems?.map(item => `${item.foodName} (${item.quantity} x $${item.price?.toFixed(2)})`).join(", ") || "No items"
      ];
    });
  
    // Create the table in the PDF
    doc.autoTable(tableColumn, tableRows, { startY: 40 });
  
    // Save the PDF
    doc.save("completed_payments.pdf");
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-6 py-12 bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-center">
          Administrator Payment Management
        </h1>

        {/* Button to Generate PDF */}
        <button
          onClick={generatePDF}
          className="px-4 py-2 mb-4 text-white bg-green-500 rounded-md hover:bg-green-700"
        >
          Complete dPayments
        </button>

        <button 
          onClick={UncompletePayments}
          className="px-4 py-2 m-5 mb-4 text-white bg-green-500 rounded-md hover:bg-green-700"
        >
        Unompleted Payments
        </button>

        {/* Search Section */}
        <form onSubmit={handleSearch} className="mb-6">
          <label className="block mb-2 text-lg font-semibold">
            Search by Token Number
          </label>
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
          {error && <p className="mt-2 text-red-500">{error}</p>}
        </form>

        {/* Search Result */}
        {filteredPayment && (
          <div className="p-4 mb-6 bg-green-100 rounded-md">
            <h2 className="text-lg font-semibold">Search Result</h2>
            <div>
              <p>
                <strong>Token Number:</strong> {filteredPayment.tokenNumber}
              </p>
              <p>
                <strong>User:</strong>{" "}
                {filteredPayment.userId
                  ? `${filteredPayment.userId.username} (${filteredPayment.userId.email})`
                  : "User info not available"}
              </p>
              <p>
                <strong>Total Price:</strong> $
                {filteredPayment.totalPrice?.toFixed(2)}
              </p>
              <p>
                <strong>Items:</strong>
              </p>
              <ul>
                {filteredPayment.cartItems?.map((item, index) => (
                  <li key={index}>
                    {item.foodName} - {item.quantity} x $
                    {item.price?.toFixed(2)}
                  </li>
                )) || <li>No items available</li>}
              </ul>
            </div>
          </div>
        )}

        {loading && <p>Loading...</p>}
        {!loading && !payments.length && <p>No payments available.</p>}

        {/* All Payments */}
        {payments.length > 0 && (
          <table className="w-full border border-collapse border-gray-300 table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border border-gray-300">Token Number</th>
                <th className="p-2 border border-gray-300">User</th>
                <th className="p-2 border border-gray-300">Total Price</th>
                <th className="p-2 border border-gray-300">Items</th>
                <th className="p-2 border border-gray-300">Actions</th>
                <th className="p-2 border border-gray-300">Complete</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={index}>
                  <td className="p-2 text-center border border-gray-300">
                    {payment.tokenNumber}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {payment.userId
                      ? `${payment.userId.username} (${payment.userId.email})`
                      : "User info not available"}
                  </td>
                  <td className="p-2 text-center border border-gray-300">
                    LKR {payment.totalPrice?.toFixed(2)}
                  </td>
                  <td className="p-2 border border-gray-300">
                    <ul>
                      {payment.cartItems?.map((item, index) => (
                        <li key={index}>
                          {item.foodName} - {item.quantity} x LKR 
                          {item.price?.toFixed(2)}
                        </li>
                      )) || <li>No items available</li>}
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
                  <td className="p-2 text-center border border-gray-300">
                    <input
                      type="checkbox"
                      checked={payment.isChecked || false}
                      onChange={() =>
                        handleCheckboxChange(payment._id, !payment.isChecked)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Selected Payment Details */}
        {selectedPayment && (
          <div className="p-4 mt-6 bg-blue-100 rounded-md">
            <h2 className="text-lg font-semibold">Payment Details</h2>
            <div>
              <p>
                <strong>Token Number:</strong> {selectedPayment.tokenNumber}
              </p>
              <p>
                <strong>User:</strong>{" "}
                {selectedPayment.userId
                  ? `${selectedPayment.userId.username} (${selectedPayment.userId.email})`
                  : "User info not available"}
              </p>
              <p>
                <strong>Total Price:</strong> ${selectedPayment.totalPrice?.toFixed(2)}
              </p>
              <p>
                <strong>Items:</strong>
              </p>
              <ul>
                {selectedPayment.cartItems?.map((item, index) => (
                  <li key={index}>
                    {item.foodName} - {item.quantity} x ${item.price?.toFixed(2)}
                  </li>
                )) || <li>No items available</li>}
              </ul>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default PaymentManager;
