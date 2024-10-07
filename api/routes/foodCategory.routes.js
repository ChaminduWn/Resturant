
// import express from 'express';
// import {
//   createFoodItem,
//   getFoodItem,
//   deleteFoodItem,
//   updateFoodItem,
//   findFoodById,
// } from '../controllers/foodCategory.controller.js';
// import { verifyToken } from "../utils/verifyUser.js";

// const router = express.Router();

// router.post('/createFood',verifyToken, createFoodItem);
// router.get('/getAllFoods',verifyToken, getFoodItem);
// router.delete('/deleteFoods/:itemId',verifyToken, deleteFoodItem);
// router.put('/updateFoods/:itemId',verifyToken, updateFoodItem);
// router.get('/:foodId', findFoodById);


// export default router;

import express from 'express';
import {
  createFoodItem,
  getFoodItem,
  deleteFoodItem,
  updateFoodItem,
  findFoodById,
} from '../controllers/foodCategory.controller.js';
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post('/createFood', verifyToken, createFoodItem); // Admin only
router.get('/getAllFoods', getFoodItem); // Public route
router.get('/findById/:foodId', findFoodById); // Public route
router.delete('/deleteFoods/:id', verifyToken, deleteFoodItem); // Admin only
router.put('/updateFoods/:id', verifyToken, updateFoodItem); // Admin only

export default router;
