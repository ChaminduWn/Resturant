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
      // Check if the food item already exists in the cart
      const itemIndex = cart.stuffs.findIndex(stuff => stuff.foodId.toString() === foodId);
      
      if (itemIndex > -1) {
        // If the item exists, update the quantity
        cart.stuffs[itemIndex].quantity += quantity;
      } else {
        // If the item doesn't exist, add it to the cart
        cart.stuffs.push({ foodId, quantity });
      }
    } else {
      // If the cart doesn't exist, create a new cart for the user
      cart = new Cart({
        userId,
        stuffs: [{ foodId, quantity }],
      });
    }

    await cart.save();
    res.status(200).json({ message: 'Item added to cart', cart });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add to cart', details: error.message });
  }
};
