import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

export default function FoodCategoryList() {
  const [foodCategories, setFoodCategories] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false); // State to show/hide delete dialog
  const [categoryToDelete, setCategoryToDelete] = useState(null); // Store the selected category for deletion
  const navigate = useNavigate(); // useNavigate hook for navigation

  const fetchFoodCategories = async () => {
    try {
      const response = await fetch('/api/foods/getAllFoods', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Include token for authentication
        }
      });
      const data = await response.json();
      setFoodCategories(data.foodCategories);
    } catch (error) {
      console.error('Error fetching food categories:', error);
    }
  };

  const deleteFoodCategory = async (id) => {
    try {
      const response = await fetch(`/api/foods/deleteFoods/${id}`, { // Fixed route here
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        setFoodCategories(foodCategories.filter((category) => category._id !== id));
        alert('Food category deleted successfully');
        closeDeleteDialog(); // Close dialog after deletion
      } else {
        alert('Failed to delete food category');
      }
    } catch (error) {
      console.error('Error deleting food category:', error);
    }
  };

  const handleEdit = (category) => {
    // navigate(`/updateFoods/${category._id}`); // Navigate to the update route
    navigate(`/admin-dashboard?tab=update-foods&foodCategoryId=${category._id}`);

  };

  const openDeleteDialog = (category) => {
    setCategoryToDelete(category); // Store the selected category
    setShowDeleteDialog(true); // Show the dialog
  };

  const closeDeleteDialog = () => {
    setShowDeleteDialog(false); // Hide the dialog
    setCategoryToDelete(null); // Clear the selected category
  };

  useEffect(() => {
    fetchFoodCategories();
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Food Categories</h2>
      {foodCategories.length === 0 ? (
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
            {foodCategories.map((category) => (
              <tr key={category._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4">
                  <img src={category.image} className="w-16 max-w-full max-h-full md:w-32" alt={category.foodName} />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{category.foodName}</td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{category.category}</td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{category.description}</td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{`$${category.price}`}</td>
                <td className="px-6 py-4">
                  <button onClick={() => handleEdit(category)} className="px-3 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 dark:bg-blue-700 dark:text-white">Edit</button>
                  <button onClick={() => openDeleteDialog(category)} className="px-3 py-2 ml-2 text-sm font-medium text-red-600 bg-red-100 rounded-lg hover:bg-red-200 dark:bg-red-700 dark:text-white">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showDeleteDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Are you sure?</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">Do you want to delete the food category "{categoryToDelete.foodName}"?</p>
            <div className="flex justify-end">
              <button onClick={closeDeleteDialog} className="px-4 py-2 mr-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700">Cancel</button>
              <button onClick={() => deleteFoodCategory(categoryToDelete._id)} className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
