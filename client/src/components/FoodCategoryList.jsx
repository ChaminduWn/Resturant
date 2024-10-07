import React, { useEffect, useState } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { useNavigate } from "react-router-dom";

export default function FoodCategoryList() {
  const [foodItems, setFoodCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // For the uploaded image file
  const [showDeleteDialog, setShowDeleteDialog] = useState(false); // State to show/hide delete dialog
  const [itemToDelete, setCategoryToDelete] = useState(null); // Store the selected category for deletion
  const [itemToEdit, setCategoryToEdit] = useState(null); // Store the selected category for editing
  const [showEditDialog, setShowEditDialog] = useState(false); // State to control the visibility of the edit modal
  const [formData, setFormData] = useState({
    foodName: "",
    description: "",
    category: "Breakfast",
    price: "",
    image: "",
  }); // State for update form data

  const navigate = useNavigate();

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
      Toastify({
        text: "Error fetching food categories!",
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        duration: 3000,
        gravity: "top",
        position: "right",
      }).showToast();
    }
  };

  const deleteFoodCategory = async (id) => {
    try {
      const response = await fetch(`/api/foods/deleteFoods/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        setFoodCategories(foodItems.filter((item) => item._id !== id));
        Toastify({
          text: "Food category deleted successfully!",
          backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
          duration: 3000,
          gravity: "top",
          position: "right",
        }).showToast();
        closeDeleteDialog();
      } else {
        Toastify({
          text: "Failed to delete food category!",
          backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
          duration: 3000,
          gravity: "top",
          position: "right",
        }).showToast();
      }
    } catch (error) {
      console.error("Error deleting food category:", error);
      Toastify({
        text: "Error deleting food category!",
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        duration: 3000,
        gravity: "top",
        position: "right",
      }).showToast();
    }
  };

  const handleEdit = (item) => {
    setCategoryToEdit(item); // Set the selected category for editing
    setFormData({
      foodName: item.foodName,
      description: item.description,
      category: item.category,
      price: item.price,
      image: item.image,
    });
    setShowEditDialog(true); // Show the edit dialog (pop-up)
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  const updateFoodCategory = async () => {
  const formDataToSend = new FormData();
  formDataToSend.append("foodName", formData.foodName);
  formDataToSend.append("description", formData.description);
  formDataToSend.append("category", formData.category);
  formDataToSend.append("price", formData.price);

  // Check if a new image is selected, otherwise append the current image URL
  if (selectedImage) {
    formDataToSend.append("image", selectedImage);
  } else {
    formDataToSend.append("image", formData.image); // Append the existing image URL
  }

  try {
    const response = await fetch(`/api/foods/updateFoods/${itemToEdit._id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formDataToSend,
    });

    if (response.ok) {
      setCategoryToEdit(null); // Reset edit state
      setShowEditDialog(false); // Hide the edit dialog (pop-up)
      fetchFoodCategories(); // Refresh food items

      Toastify({
        text: "Food item updated successfully!",
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        duration: 3000,
        gravity: "top",
        position: "right",
      }).showToast();
    } else {
      Toastify({
        text: "Failed to update food item!",
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        duration: 3000,
        gravity: "top",
        position: "right",
      }).showToast();
    }
  } catch (error) {
    console.error("Error updating food item:", error);
    Toastify({
      text: "Error updating food item!",
      backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
      duration: 3000,
      gravity: "top",
      position: "right",
    }).showToast();
  }
};

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]); // Save the selected image file
  };

  const openDeleteDialog = (item) => {
    setCategoryToDelete(item);
    setShowDeleteDialog(true);
  };

  const closeDeleteDialog = () => {
    setShowDeleteDialog(false);
    setCategoryToDelete(null);
  };

  useEffect(() => {
    fetchFoodCategories();
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        Food Categories
      </h2>
      {foodItems.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          No categories available
        </p>
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
                    onClick={() => handleEdit(item)}
                    className="px-3 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 dark:bg-blue-700 dark:text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteDialog(item)}
                    className="px-3 py-2 ml-2 text-sm font-medium text-red-600 bg-red-100 rounded-lg hover:bg-red-200 dark:bg-red-700 dark:text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Edit dialog */}
      {showEditDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Edit Food Category
            </h2>
            <form>
              <div className="mt-2">
                <label htmlFor="foodName" className="block text-sm text-gray-700 dark:text-gray-400">
                  Food Name:
                </label>
                <input
                  type="text"
                  id="foodName"
                  name="foodName"
                  value={formData.foodName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="category" className="block text-sm text-gray-700 dark:text-gray-400">
                  Category:
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Shorties">Shorties</option>
                  <option value="Drinks">Drinks</option>
                  <option value="Desserts">Desserts</option>
                </select>
              </div>
              <div className="mt-2">
                <label htmlFor="description" className="block text-sm text-gray-700 dark:text-gray-400">
                  Description:
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="price" className="block text-sm text-gray-700 dark:text-gray-400">
                  Price:
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
                />
              </div>

              {/* Image upload section */}
              <div className="mt-2">
                <label htmlFor="image" className="block text-sm text-gray-700 dark:text-gray-400">
                  Image:
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
                />
                        {formData.image && !selectedImage && (
          <img src={formData.image} alt="Current" className="w-32 mt-2" />
        )}

              </div>

              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => updateFoodCategory()}
                  className="px-4 py-2 mr-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditDialog(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-500 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete dialog (confirm delete action) */}
      {showDeleteDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Confirm Deletion
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Are you sure you want to delete this category?
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => deleteFoodCategory(itemToDelete._id)}
                className="px-4 py-2 mr-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={closeDeleteDialog}
                className="px-4 py-2 text-sm font-medium text-gray-500 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
