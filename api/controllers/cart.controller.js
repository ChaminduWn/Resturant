import Cart from '../models/cart.model.js';
import FoodCategory from '../models/foodCategory.model.js';

export const addToCart = async (req, res) => {
  try {
    const { userId, foodId, quantity } = req.body;

    // Check if the food item exists
    const foodItem = await FoodCategory.findById(foodId);
    if (!foodItem) {
      return res.status(404).json({ error: 'Food item not found' });
    }

    let cart = await Cart.findOne({ userId });

    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.foodId == foodId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity; // Update quantity if item already exists
      } else {
        cart.items.push({ foodId, quantity }); // Add new item if not already in cart
      }
    } else {
      cart = new Cart({ userId, items: [{ foodId, quantity }] });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add to cart' });
  }
};
