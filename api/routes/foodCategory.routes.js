
import express from 'express';
import {
  createFoodCategory,
  getFoodCategories,
  deleteFoodCategory,
  updateFoodCategory,
} from '../controllers/foodCategory.controller.js';
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post('/createFood',verifyToken, createFoodCategory);
router.get('/getAllFoods',verifyToken, getFoodCategories);
router.delete('/deleteFoods/:categoryId',verifyToken, deleteFoodCategory);
router.put('/updateFoods/:categoryId',verifyToken, updateFoodCategory);

export default router;
