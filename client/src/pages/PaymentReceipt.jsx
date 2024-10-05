import React from "react";
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles for the PDF document
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

// PDF Document component
const ReceiptPDF = ({ paymentDetails, tokenNumber }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Payment Successful!</Text>
      <Text style={styles.text}>Your order has been confirmed with the following details:</Text>

      <View style={styles.section}>
        <Text style={styles.heading}>Order Summary</Text>
        {paymentDetails.cartItems.map((item, index) => (
          <Text key={index} style={styles.list}>
            {item.foodName} - {item.quantity} x ${item.price.toFixed(2)}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Total Price</Text>
        <Text style={styles.text}>${paymentDetails.totalPrice.toFixed(2)}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Payment Info</Text>
        <Text style={styles.text}>Cardholder: {paymentDetails.paymentInfo.cardName}</Text>
      </View>

      <Text style={styles.token}>Token Number: {tokenNumber}</Text>

      <Text style={styles.footer}>Thank you for your order!</Text>
    </Page>
  </Document>
);

const PaymentReceipt = () => {
  const paymentDetails = {
    cartItems: [
      { foodName: "Orange Juice", quantity: 1, price: 200.00 }
    ],
    totalPrice: 200.00,
    paymentInfo: { cardName: "naluwa" }
  };
  const tokenNumber = 628;

  return (
    <>
      <div className="flex flex-col items-center min-h-screen py-12 bg-gray-100">
        <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
          <h1 className="mb-4 text-2xl font-bold text-center text-green-600">Payment Successful!</h1>
          <p className="mb-6 text-lg font-medium text-center">Your order has been confirmed with the following details:</p>

          <div className="mb-4">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            <ul className="pl-5 list-disc">
              {paymentDetails.cartItems.map((item, index) => (
                <li key={index}>
                  {item.foodName} - {item.quantity} x ${item.price.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold">Total Price</h2>
            <p>${paymentDetails.totalPrice.toFixed(2)}</p>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold">Payment Info</h2>
            <p>Cardholder: {paymentDetails.paymentInfo.cardName}</p>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold">Token Number</h2>
            <p className="text-xl font-bold">{tokenNumber}</p>
          </div>

          <p className="mt-6 text-lg text-center text-gray-700">Thank you for your order!</p>
        </div>

        {/* PDF Download Link */}
        <PDFDownloadLink
          document={<ReceiptPDF paymentDetails={paymentDetails} tokenNumber={tokenNumber} />}
          fileName="receipt.pdf"
        >
          {({ loading }) =>
            loading ? (
              <button className="px-4 py-2 mt-6 text-white bg-blue-600 rounded hover:bg-blue-800">
                Generating PDF...
              </button>
            ) : (
              <button className="px-4 py-2 mt-6 text-white bg-blue-600 rounded hover:bg-blue-800">
                Download Receipt as PDF
              </button>
            )
          }
        </PDFDownloadLink>
      </div>
    </>
  );
};

export default PaymentReceipt;
