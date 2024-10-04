import Cart from "../models/cart.model.js";
import { errorHandler } from "../utils/error.js";

// Add item to cart
export const addToCart = async (req, res, next) => {
  try {
    const { foodId, quantity, price } = req.body;
    const userId = req.user._id;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create a new cart for the user
      cart = new Cart({
        userId,
        items: [{ foodId, quantity, price }],
        totalPrice: price * quantity,
      });
    } else {
      // If cart exists, add/update the item
      const itemIndex = cart.items.findIndex(
        (item) => item.foodId.toString() === foodId
      );

      if (itemIndex > -1) {
        // Update quantity if item exists
        cart.items[itemIndex].quantity += quantity;
        cart.items[itemIndex].price = price;
      } else {
        // Add new item to cart
        cart.items.push({ foodId, quantity, price });
      }
      // Recalculate total price
      cart.totalPrice += price * quantity;
    }

    await cart.save();
    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    next(errorHandler(500, { message: error.message }));
  }
};

// Get cart for a specific user
export const getUserCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId }).populate("items.foodId");

    if (!cart) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    next(errorHandler(500, { message: error.message }));
  }
};
