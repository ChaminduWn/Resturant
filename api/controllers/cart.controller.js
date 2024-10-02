import Cart from'../models/cart.model.js';

export const addToCart = async (req, res) => {
  try {
    const { userId, foodId, quantity } = req.body;
    let cart = await Cart.findOne({ userId });

    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.foodId == foodId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ foodId, quantity });
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

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.foodId');
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { userId, foodId } = req.body;
    const cart = await Cart.findOne({ userId });

    if (cart) {
      cart.items = cart.items.filter(item => item.foodId != foodId);
      await cart.save();
    }
    
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
};
