import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation

export default function FoodCategoryList() {
  const [foodCategories, setFoodCategories] = useState([]);
  const navigate = useNavigate(); // Use to navigate to the cart page

  const fetchFoodCategories = async () => {
    try {
      const response = await fetch('/api/foods/getAllFoods', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setFoodCategories(data.foodCategories);
    } catch (error) {
      console.error('Error fetching food categories:', error);
    }
  };

  // Function to handle adding an item to the cart
  const addToCart = async (category) => {
    try {
      const response = await fetch('/api/cart/addToCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ 
          foodId: category._id, 
          userId: localStorage.getItem('userId'), // Assume userId is stored in localStorage 
          foodName: category.foodName,
          price: category.price,
          quantity: 1 
        })
      });
      if (response.ok) {
        navigate('/cart'); // Redirect to the cart page after adding item to the cart
      } else {
        alert('Failed to add item to the cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
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
              <button onClick={() => addToCart(category)}>Add to Cart</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
