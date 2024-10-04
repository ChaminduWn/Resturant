"use client";

const PaymentReview = ({ selectedShippingCost }) => {
  // ... other component logic (product details, discount section, etc.)
  const shippingCost = parseFloat(selectedShippingCost);
  const productSubTotal = 36990; // Replace with actual product price logic

  const calculateTotal = () => {
    return productSubTotal + shippingCost;
  };
  const isShippingPage =
    window.location.pathname === "/Checkout/payment/shipping";
  return (
    <div className="p-4 rounded-md shadow-md bg-[#1F1F1F]">
      {/* Product details section */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200 ">
        <div className="flex items-center">
          <img
            src="https://fitnessisland.lk/cdn/shop/files/DymatizeISO100_360x.png?v=1702020881"
            alt="Product image"
            className="object-cover w-20 h-20 rounded-lg"
          />
          <div className="ml-4">
            <p className="text-base font-semibold text-white" id="productName">
              ISO100 Dymatize ISO100 Hydrolyzed
            </p>
            <p className="text-sm text-white" id="productInfo">
              Whey Protein Isolate 2.3KG
            </p>
            <p className="text-sm text-white" id="productInfoMore">
              Flavours: Fudge Brownie
            </p>
          </div>
        </div>
        <p className="text-base font-semibold text-white" id="productPrice">
          RS 36,990.00
        </p>
      </div>

      {/* Discount code or Gift card section */}
      <div className="flex items-center justify-between py-4 border-b border-gray-200">
        <p className="text-sm text-white">Discount code or Gift card</p>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Enter code"
            className="w-full px-4 py-2 text-white bg-[#1F1F1F] border border-[#A80000] rounded-lg focus:ring-[#A80000] focus:border-[#A80000] outline-none"
          />
          <button
            type="button"
            className="ml-2 px-4 py-2 text-white bg-[#A80000] rounded-lg hover:bg-[#A80000] focus:ring-[#A80000] focus:outline-none"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Subtotal section */}
      <div className="flex items-center justify-between py-4">
        <p className="text-sm text-white">Subtotal</p>
        <p className="text-base font-semibold text-white" id="productSubTotal">
          RS 36,990.00
        </p>
      </div>

      {isShippingPage && (
        <div className="flex items-center justify-between py-4">
          <p className="text-sm text-white">Shipping</p>
          <p
            className="text-base font-semibold text-white"
            id="productShipping"
          >
            RS {selectedShippingCost || 0}.00
          </p>
        </div>
      )}

      {/* Total section */}
      <div className="flex items-center justify-between py-4 border-t border-gray-200">
        <p className="text-base font-semibold text-white">Total</p>
        <p className="text-lg font-semibold text-white" id="productTotal">
          RS {calculateTotal()}.00
        </p>
      </div>
    </div>
  );
};

export default PaymentReview;