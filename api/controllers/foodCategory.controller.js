import FoodCategory from '../models/foodCategory.model.js';
import { errorHandler } from '../utils/error.js';

// Create a new food category
export const createFoodCategory = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to create a food category'));
    }

    const { foodName, description, category, price, image } = req.body;

    if (!foodName || foodName.trim() === '') {
      return next(new Error('Food name is required'));
    }

    const newFoodCategory = new FoodCategory({
      foodName,
      description,
      category,
      price,
      image
    });

    const savedCategory = await newFoodCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    next(error);
  }
};

// Get all food categories or filter by category
export const getFoodCategories = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    const category = req.query.category;

    const query = category ? { category } : {};

    const foodCategories = await FoodCategory.find(query)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .exec();

    res.status(200).json({ foodCategories });
  } catch (error) {
    next(error);
  }
};



// Delete a food category by ID
export const deleteFoodCategory = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to delete this food category'));
    }

    await FoodCategory.findByIdAndDelete(req.params.categoryId);
    res.status(200).json({ message: 'Food category deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Update a food category by ID
export const updateFoodCategory = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to update this food category'));
    }

    const { foodName, description, category, price, image } = req.body;

    const updatedCategory = await FoodCategory.findByIdAndUpdate(
      req.params.categoryId,
      {
        $set: {
          foodName,
          description,
          category,
          price,
          image,
        },
      },
      { new: true }
    );

    res.status(200).json(updatedCategory);
  } catch (error) {
    next(error);
  }
};
