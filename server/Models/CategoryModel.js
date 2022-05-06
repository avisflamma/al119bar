import mongoose from "mongoose";



const categoryBannerSchema = mongoose.Schema(
    {
        description: { 
            type: String,
        },
        image: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const categorySchema = mongoose.Schema(
  {
    isEnabled: {
        type: Boolean,
        required: true,
        default: true,
    },
    categoryName: { 
        type: String, 
        required: true
    },
    categoryBanner: [categoryBannerSchema],
    categoryUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
