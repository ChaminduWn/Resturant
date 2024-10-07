import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
import Toastify from "toastify-js"; 
import "toastify-js/src/toastify.css"; 

export default function Item() {
  const [foodItems, setFoodItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [error, setError] = useState(null); // State for handling errors
  const navigate = useNavigate();

  // Fetch all food items based on search
  const fetchFoodItems = async () => {
    try {
      const response = await fetch(`/api/foods/getAllFoods?search=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch food items");
      }

      const data = await response.json();
      if (data.foodItems) {
        setFoodItems(data.foodItems);
        setError(null);
      } else {
        setFoodItems([]); // Set empty if no items found
        setError("No items found");
      }
    } catch (error) {
      setError(error.message);
      setFoodItems([]); // Handle error by resetting the foodItems
    }
  };

  // Update cart count
  const updateCartCount = () => {
    const userId = localStorage.getItem("userId");
    const userCart = JSON.parse(localStorage.getItem(`cart_${userId}`) || "[]");
    setCartCount(userCart.length);
  };

  // Add food item to the cart
  const addToCart = (item) => {
    const userId = localStorage.getItem("userId");
    const cartKey = `cart_${userId}`;
    const currentCartList = JSON.parse(localStorage.getItem(cartKey) || "[]");

    if (!currentCartList.some((cartItem) => cartItem.id === item._id)) {
      currentCartList.push({
        id: item._id,
        quantity: 1,
        price: item.price,
        foodName: item.foodName,
        image: item.image,
      });
    } else {
      currentCartList.forEach((cartItem) => {
        if (cartItem.id === item._id) {
          cartItem.quantity += 1;
        }
      });
    }

    localStorage.setItem(cartKey, JSON.stringify(currentCartList));
    setCartCount(currentCartList.length);
    showToast("Item added to cart!");
  };

  // Handle "Buy Now" button click
  const handleBuyNow = (item) => {
    addToCart(item);
    navigate(`/shoppingCart`);
  };

  // Show toast notification
  const showToast = (message) => {
    Toastify({
      text: message,
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      backgroundColor: "linear-gradient(to right, #4caf50, #81c784)",
    }).showToast();
  };

  useEffect(() => {
    fetchFoodItems();
    updateCartCount();
  }, [searchTerm]); // Re-fetch food items on search term change

  const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
  const currentUser = user ? JSON.parse(user).currentUser : null;

  return (
    <div className="min-h-screen">
      {/* Top bar with "Add Your Item", Cart and Search */}
      <div className="flex items-center justify-between p-4 bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-700">Add Your Item</h1>
        <input
          type="text"
          placeholder="Search Food..."
          className="p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input
        />
        <div className="relative flex items-center">
          <Link to={`/shoppingCart`}>
            <span className="text-3xl text-black">
              <MdOutlineShoppingCart />
            </span>
          </Link>
          <div className="absolute flex items-center justify-center w-5 h-5 p-1 text-white bg-black rounded-full -top-2 -right-2">
            <p className="text-sm">{cartCount}</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex items-center justify-center">
        <div className="max-w-[1200px] mx-auto">
          {error ? (
            <p className="text-red-600 dark:text-red-400">{error}</p>
          ) : foodItems.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">No items available</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {foodItems.map((item) => (
                <div
                  key={item._id}
                  className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full h-[300px] overflow-hidden min-w-[300px] min-h-[300px]"
                >
                  <div className="relative mx-2 mt-2 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-[150px]">
                    <img
                      src={item.image}
                      alt={item.foodName}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <p className="block font-sans text-sm font-medium leading-relaxed text-blue-gray-900">
                        {item.foodName}
                      </p>
                      <p className="block font-sans text-sm font-medium leading-relaxed text-blue-gray-900">
                        LKR {item.price}
                      </p>
                    </div>
                    <p className="block font-sans text-xs font-normal leading-normal text-gray-700 opacity-75">
                      {item.description}
                    </p>
                  </div>
                  {currentUser?._id && (
                    <div className="absolute flex justify-between bottom-3 left-3 right-3">
                      <button
                        onClick={() => addToCart(item)}
                        className="px-4 py-2 font-semibold text-white bg-green-600 rounded hover:bg-green-500"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleBuyNow(item)}
                        className="px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-500"
                      >
                        Buy Now
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
