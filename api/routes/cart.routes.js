import express from 'express';
import { addToCart } from '../controllers/cart.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/addToCart', verifyToken, addToCart);
router.post('/api/cart/addToCart', async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    
    // Validate input
    if (!req.body.foodId || !req.body.quantity) {
      throw new Error('Missing required fields');
    }

    // Process the addition to cart
    // ... your existing code here

    res.status(200).json({ message: 'Item added to cart successfully' });
  } catch (error) {
    console.error('Error in /api/cart/addToCart:', error);
    res.status(500).json({ message: 'Failed to add item to cart', error: error.message });
  }
});

export default router;
