import Supplements from "../models/supplements.model.js";
import FoodCategory from "../models/foodCategory.model.js";
import { errorHandler } from "../utils/error.js";


export const createFood = async (req, res, next) => {

    try {
        const foodcategory = await FoodCategory.create(req.body);
        return res.status(201).json(foodcategory);
    } catch (error) {
        next(error);
    }

};



export const getAllFoods = async (req, res, next) => {
    try {
      
        const searchQuery = req.query.search || ''  ;

        const foodId = req.query.foodId;

    const query = foodId ? { foodId } : {};

      // Find supplements by IDs
      const foodcategory = await FoodCategory.find({ 
        productName:{$regex:new RegExp(searchQuery,'i')},
        ...(req.query.foodId && { _id: req.query.foodId}),
        ...(req.query.foodName && { foodName: req.query.foodName}),
        ...(req.query.sellingPrice && { sellingPrice: req.query.sellingPrice}),
        ...(req.query.imageUrl && { imageUrls: req.query.imageUrl}),
       });


       const totalFoodCategory = await FoodCategory.countDocuments(); // Count total FoodCategory

  
      res.status(200).json({ 
        foodcategory ,
        totalFoodCategory,
    
    });
    } catch (error) {
      next(error);
    }
  };

  export const getAllFoodsById = async (req, res, next) => {
    try {

        const query = foodId ? { foodId } : {};
      const foodcategory = await FoodCategory.findById(req.params.id);
    

      if (!foodcategory) {
        return next(errorHandler(404, 'Listing not found!'));
      }
      
      res.status(200).json(foodcategory);
    } catch (error) {
      next(error);
    }
  };
  

export const deleteFoods = async (req, res, next) => {
    // if(!req.user.role === 'Manager'){
    //     next(errorHandler(403, "You are not access to leaves"));
    // }

    try {
        await FoodCategory.findByIdAndDelete(req.params.foodId)
        res.status(200).json("The foodcategory is deleted");
    } catch (error) {
        next(error);
    }
}

export const updateFoods = async (req, res, next) => {
    if(!req.user.role === 'Admin' || !req.user.role === 'Manager'){
        next(errorHandler(403, "You are not access to delete"));
    }

    try {
        const updateFood = await FoodCategory.findByIdAndUpdate(
            req.params.foodId, 
            {
                $set: {
                    foodName: req.body.foodName,
                    description: req.body.description,
                    category: req.body.category,
                    price: req.body.price,
                    sellingPrice: req.body.sellingPrice,
                    imageUrls: req.body.imageUrls,
                },
            },
            { new: true });
        res.status(200).json(updateFoods);
        
    } catch (error) {
        next(error);
    }
}