import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Item() {
  const [foodItems, setFoodCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    foodName: "",
    description: "",
    category: "Breakfast",
    price: "",
    image: "",
  });

  const navigate = useNavigate();

  // Fetch all food categories (or items)
  const fetchFoodCategories = async () => {
    try {
      const response = await fetch("/api/foods/getAllFoods", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setFoodCategories(data.foodItems);
    } catch (error) {
      console.error("Error fetching food categories:", error);
    }
  };

  // Add food item to the cart
  const addToCart = async (item) => {
    // Retrieve the user object from local storage and parse it
    const userData = JSON.parse(localStorage.getItem("persist:root"));

    // If userData is valid, parse the currentUser object from it
    const user = userData && JSON.parse(userData.user)?.currentUser;

    const userId = user?._id; // Retrieve the user ID

    // Debugging: Print userId to check if it's retrieved correctly
    console.log("User ID:", userId);

    // If the user ID is not found, prompt the user to login
    if (!userId || userId === "undefined") {
      alert("User not logged in. Please login to add items to the cart.");
      navigate("/login"); // Redirect to login if user ID is not found
      return;
    }

    try {
      const response = await fetch("/api/cart/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          foodId: item._id,
          quantity: 1,
          userId: userId, // Use the correct userId here
        }),
      });

      if (response.ok) {
        alert("Food added to cart!");
        navigate(`/cart?foodId=${item._id}&userId=${userId}&quantity=1`); // Navigate to the cart page with query params
      } else {
        alert("Failed to add food to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Handle image change
  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]); // Save the selected image file
  };

  // Fetch food categories (items) on component load
  useEffect(() => {
    fetchFoodCategories();
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        Food Categories
      </h2>
      {foodItems.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No categories available</p>
      ) : (
        <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">Food Name</th>
              <th scope="col" className="px-6 py-3">Category</th>
              <th scope="col" className="px-6 py-3">Description</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {foodItems.map((item) => (
              <tr
                key={item._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="p-4">
                  <img
                    src={item.image}
                    className="w-16 max-w-full max-h-full md:w-32"
                    alt={item.foodName}
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item.foodName}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item.category}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item.description}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {`$${item.price}`}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => addToCart(item)}
                    className="px-3 py-2 ml-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                  >
                    Add to Cart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
