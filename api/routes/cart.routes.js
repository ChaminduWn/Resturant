import express from 'express';
import { addToCart, getUserCart } from '../controllers/cart.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// POST request to add a food item to the cart
router.post('/addToCart', verifyToken, addToCart);

// GET request to get cart items for the user
router.get('/getCart/:userId', verifyToken, getUserCart);

export default router;
