import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "green",
    fontWeight: "bold",
  },
  section: {
    marginBottom: 12,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
  },
  list: {
    marginLeft: 10,
    marginBottom: 6,
  },
  token: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  footer: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 14,
    color: "#555",
  },
});

const ReceiptPDF = ({ paymentDetails, tokenNumber }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Payment Successful!</Text>
      <Text style={styles.text}>Your order has been confirmed with the following details:</Text>

      <View style={styles.section}>
        <Text style={styles.heading}>Payment Info</Text>
        <Text style={styles.text}>Card Type: {paymentDetails.paymentInfo.cardType}</Text>
        <Text style={styles.text}>Card Name: {paymentDetails.paymentInfo.cardName}</Text>
        <Text style={styles.text}>Card Number: **** **** **** {paymentDetails.paymentInfo.cardNumber.slice(-4)}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Order Summary</Text>
        <Text style={styles.text}>Total Price: LKR {paymentDetails.totalPrice.toFixed(2)}</Text>
        <Text style={styles.heading}>Items:</Text>
        <View style={styles.list}>
          {paymentDetails.cartItems.map((item, index) => (
            <Text key={index} style={styles.text}>
              {item.foodName} x {item.quantity}
            </Text>
          ))}
        </View>
      </View>

      <Text style={styles.token}>Token Number: {tokenNumber}</Text>
      <Text style={styles.footer}>Thank you for your order!</Text>
    </Page>
  </Document>
);

const PaymentReceipt = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { paymentDetails, tokenNumber } = location.state || {}; // Safe access to location.state

  // If paymentDetails or tokenNumber is missing, redirect to an error or another page
  if (!paymentDetails || !tokenNumber) {
    // Redirect user to the home or cart page with an error message
    navigate("/cart", { replace: true });
    return null; // Prevent further rendering
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 bg-gray-200">
      <h1 className="mb-4 text-2xl font-bold">Payment Receipt</h1>
      <p className="mb-2">Thank you for your purchase! Here are your order details:</p>
      <p className="mb-2">Token Number: {tokenNumber}</p>
      <PDFDownloadLink
        document={<ReceiptPDF paymentDetails={paymentDetails} tokenNumber={tokenNumber} />}
        fileName="receipt.pdf"
      >
        {({ loading }) =>
          loading ? (
            <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700">
              Loading Receipt...
            </button>
          ) : (
            <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700">
              Download Receipt
            </button>
          )
        }
      </PDFDownloadLink>
    </div>
  );
};

export default PaymentReceipt;
