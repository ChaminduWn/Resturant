import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function FoodCategoryUpdate() {
  const { id } = useParams(); // Get category ID from the URL
  const [category, setCategory] = useState({
    foodName: '',
    category: '',
    description: '',
    price: '',
  });
  const navigate = useNavigate();

  // Fetch the category data based on the ID from the URL
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`/api/foods/getFoodCategory/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setCategory(data);
        } else {
          alert('Failed to fetch category details');
        }
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };
    fetchCategory();
  }, [id]);

  // Handle form submission for updating category data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/foods/updateFoods/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(category),
      });

      if (response.ok) {
        alert('Category updated successfully');
        navigate('/categories'); // Navigate back to the list
      } else {
        alert('Failed to update category');
      }
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      {category ? (
        <form onSubmit={handleSubmit}>
          <h2 className="mb-4 text-lg font-semibold">Update Food Category</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Food Name:</label>
            <input
              type="text"
              name="foodName"
              value={category.foodName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Category:</label>
            <input
              type="text"
              name="category"
              value={category.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description:</label>
            <input
              type="text"
              name="description"
              value={category.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Price:</label>
            <input
              type="number"
              name="price"
              value={category.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Update Category
            </button>
          </div>
        </form>
      ) : (
        <p>Loading category details...</p>
      )}
    </div>
  );
}
