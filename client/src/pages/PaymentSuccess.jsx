import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

const PaymentSuccess = () => {
  const location = useLocation();
  const email = location.state ? location.state.email : "";
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await axios.get(`/api/pay/paymentshopEmail/${email}`);
        setPaymentData(response.data);
      } catch (error) {
        console.error("Failed to fetch payment data:", error);
      }
    };

    fetchPaymentData();
  }, [email]);

  return (
    <>
      <Header />
      <div className="flex justify-center items-center bg-[#1F1F1F] text-white">
        <div className="w-full max-w-screen-lg p-10bg-[#1F1F1F] rounded-lg shadow-md">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-white">Payment Success!</h1>
          </div>
          <div className="my-4 text-white">
            <p>Your payment has been successfully done. </p>
          </div>
          <div className="flex justify-between pb-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-white">Total Payment</h2>
            <p className="text-lg font-bold text-white">RS 37,049.00</p>
          </div>
          <div className="flex justify-between pb-4 border-b border-gray-200">
            <div className="text-white">
              <p>ISO</p>
              <p>Dymatize ISO100 Hydrolyzed Whey Protein Isolate 2.3KG</p>
              <p>Flavours: Fudge Brownie</p>
            </div>
          </div>
          <div className="flex justify-between pb-4 border-b border-gray-200 ">
            <div className="w-1/2 pr-4">
              <div className="p-4 bg-[#1F1F1F] rounded-lg shadow-md border-b border-white">
                <p className="text-white">Ref Number:</p>
                <p> {paymentData ? paymentData.paymentId : "Loading..."}</p>
              </div>
            </div>
            <div className="w-1/2 pl-4">
              <div className="p-4 bg-[#1F1F1F] rounded-lg shadow-md border-b border-white">
                <p className="text-white">Payment Time: </p>
                <p>{paymentData ? paymentData.createdAt : "Loading..."}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between pb-4 border-b border-white">
            <div className="w-1/2 pr-4">
              <div className="p-4 bg-[#1F1F1F] rounded-lg shadow-md border-b border-white">
                <p className="text-white">Payment Method:</p>
                <p>{paymentData ? paymentData.paymentMethod : "Loading..."}</p>
              </div>
            </div>
            <div className="w-1/2 pl-4">
              <div className="p-4 bg-[#1F1F1F] rounded-lg shadow-md border-b border-white">
                <p className="text-white">Name: </p>
                <p>{paymentData ? paymentData.firstName : "Loading..."}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;