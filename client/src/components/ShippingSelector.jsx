import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import PaymentReview from "./PaymentReview";

function ShippingSelector() {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [shippingMethods, setShippingMethods] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state;
  const [selectedShippingCost, setSelectedShippingCost] = useState(0);

  useEffect(() => {
    const fetchShippingMethods = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/shipping/getShippingMethods");
        if (response.data && Array.isArray(response.data.data)) {
          // Extract shipping methods array from response
          setShippingMethods(response.data.data);
          setLoading(false);
        } else {
          console.error("Invalid response format:", response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching shipping methods:", error);
        setLoading(false);
      }
    };

    fetchShippingMethods();
  }, []);

  const handleRadioChange = (e) => {
    setSelectedMethod(e.target.value);
    // Find the selected shipping method and update selected shipping cost
    const selectedShippingMethod = shippingMethods.find(
      (method) => method.shippingMethodName === e.target.value
    );
    if (selectedShippingMethod) {
      setSelectedShippingCost(selectedShippingMethod.shippingCost);
    }
  };

  const handleShipping = () => {
    navigate("/Checkout/payment/paymentSelect", {
      state: { selectedMethod, formData },
    });
  };

  return (
    <div className="flex flex-col md:flex-row justify-between px-20 py-4 bg-[#1F1F1F]">
      <div className="w-full px-20 py-4 rounded-lg shadow-md md:w-1/2">
        <h3 className="mb-4 text-2xl font-semibold text-white">
          Select Shipping Method
        </h3>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {shippingMethods.map((method) => (
              <div className="flex items-center mb-4" key={method._id}>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id={method._id}
                    name="shipping_method"
                    value={method.shippingMethodName}
                    className="mr-2"
                    checked={selectedMethod === method.shippingMethodName}
                    onChange={handleRadioChange}
                  />
                  <label className="text-lg text-white">
                    {method.shippingMethodName} - Rs.{method.shippingCost}
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}
        <button
          onClick={handleShipping}
          type="submit"
          className="text-white bg-[#A80000] hover:bg-[#A80000] focus:ring-4 focus:ring-[#A80000] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Continue to Payment
        </button>
      </div>
      <PaymentReview
        selectedShippingCost={selectedShippingCost}
        subtotal={formData.subtotal} // Assuming you have a subtotal in formData
      />
    </div>
  );
}

export default ShippingSelector;