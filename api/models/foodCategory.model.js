import mongoose from "mongoose";

const foodCategorySchema = new mongoose.Schema(
    {
        foodName: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            required: true,
            enum: ['Breakfast', 'Lunch', 'Dinner', 'Shorties','Drinks', 'Desserts'], // Define the valid categories
        },

        price: {
            type: Number,
            required: true,
        },

        image: {
            type: String, // Assuming you store the image URL
            default: 'https://i.pinimg.com/originals/2b/f0/e0/2bf0e06f26135c159a64591c817f639e.jpg',
        },
    }
);

const FoodItem = mongoose.model('FoodItem', foodCategorySchema);

export default FoodItem;
