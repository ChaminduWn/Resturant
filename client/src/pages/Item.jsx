import { Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FoodCategoryList() {
  const [foodCategories, setFoodCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchFoodCategories = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/foods/getAllFoods', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch food categories');
      }
      const data = await response.json();
      setFoodCategories(data.foodCategories);
    } catch (error) {
      console.error('Error fetching food categories:', error);
      setError('Failed to load food categories. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

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
          quantity: 1,
          foodName: category.foodName,
          price: category.price,
          image: category.image
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server response:', errorData);
        throw new Error(errorData.message || `Failed to add to cart: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Successfully added to cart:', data);

      navigate('/cart', { 
        state: { 
          addedItem: {
            id: category._id,
            name: category.foodName,
            price: category.price,
            image: category.image,
            quantity: 1
          }
        }
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      setError(`Failed to add to cart: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchFoodCategories();
  }, []);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-[1080px] mx-auto">
        {foodCategories.length === 0 ? (
          <p className="text-center text-gray-700">No categories available</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {foodCategories.map((category) => (
              <div key={category._id} className="relative flex flex-col text-gray-700 bg-white shadow-md rounded-xl">
                <div className="relative h-48 mx-4 mt-4 overflow-hidden bg-white rounded-xl">
                  <img
                    src={category.image}
                    alt={category.foodName}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-sans text-base font-medium text-blue-gray-900">
                      {category.foodName}
                    </p>
                    <p className="font-sans text-base font-medium text-blue-gray-900">
                      ${category.price}
                    </p>
                  </div>
                  <p className="font-sans text-sm text-gray-700 opacity-75">
                    {category.description}
                  </p>
                </div>
                <div className="p-4 pt-0">
                  <Button
                    className="w-full px-6 py-3 font-sans text-xs font-bold text-center uppercase align-middle transition-all rounded-lg bg-blue-gray-900/10 text-blue-gray-900 hover:scale-105 focus:scale-105"
                    onClick={() => addToCart(category)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}