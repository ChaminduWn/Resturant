import React, { useEffect, useState } from 'react';

export default function FoodCategoryList() {
    const [foodCategories, setFoodCategories] = useState([]);

  const fetchFoodCategories = async () => {
    try {
      const response = await fetch('/api/foods/getAllFoods', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Include token for authentication
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
      const response = await fetch(`/api/foods/deleteFoods${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        setFoodCategories(foodCategories.filter((category) => category._id !== id));
        alert('Food category deleted successfully');
      } else {
        alert('Failed to delete food category');
      }
    } catch (error) {
      console.error('Error deleting food category:', error);
    }
  };

  useEffect(() => {
    fetchFoodCategories();
  }, []);

  return (
    <div>
      <h2>Food Categories</h2>
      {foodCategories.length === 0 ? (
        <p>No categories available</p>
      ) : (
        <ul>
          {foodCategories.map((category) => (
            <li key={category._id}>
              <h3>{category.foodName} - {category.category}</h3>
              <p>{category.description}</p>
              <p>Price: ${category.price}</p>
              <img src={category.image} alt={category.foodName} width="100" />
              <button onClick={() => deleteFoodCategory(category._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

