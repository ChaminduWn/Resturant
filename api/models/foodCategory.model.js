import mongoose from "mongoose";

const foodCategorySchema = new mongoose.Schema(
    {
        foodName:{
            type: String,
            required: true,
        },

        
        description:{
            type: String,
            required: true,
        },

        category:{
            type: String,
            required: true,
        },

        price:{
                type: Number,
                required: true,
        },

        sellingPrice:{
            type: Number,
            required: true,
        },

        
        imageUrls:{
            type: Array,
            required: true,
        },
        userRef:{
            type: String,
            required: true,
        },
    }, {timestamps: true
}
);



const FoodCategory = mongoose.model('FoodCategory', foodCategorySchema);

export default FoodCategory;