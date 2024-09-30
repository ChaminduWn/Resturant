import express from "express";


import { verifyToken } from "../utils/verifyUser.js";
import { createFood, deleteFoods, getAllFoods, updateFoods } from "../controllers/foodCategory.controller.js";

const router = express.Router();

router.post("/createFood", verifyToken, createFood);
router.get("/getAllFoods", getAllFoods);
router.delete("/deleteFoods/:foodId", deleteFoods);
router.put("/updateFoods/:foodId", verifyToken, updateFoods);
// router.get('/getAllSupplements', getAllSupplements);

router.post("/create", verifyToken, createSupplements);
export default router;