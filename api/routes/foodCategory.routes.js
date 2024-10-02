
import express from 'express';
import {
  createFoodCategory,
  getFoodCategories,
  deleteFoodCategory,
  updateFoodCategory,
} from '../controllers/FoodCategory.controller.js';

import { verifyToken } from "../utils/verifyUser.js";


const router = express.Router();

// Route to create a new food category
router.post('/createFood',verifyToken, createFoodCategory);

// Route to get all food categories or filter by category
router.get('/getAllFoods',verifyToken, getFoodCategories);

// Route to delete a specific food category by ID
router.delete('/deleteFoods/:categoryId',verifyToken, deleteFoodCategory);

// Route to update a specific food category by ID
router.put('/updateFoods/:categoryId',verifyToken, updateFoodCategory);



export default router;
