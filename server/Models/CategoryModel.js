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
        default: true,
    },
    title: { 
        type: String, 
        required: true
    },
    categoryBanner: [categoryBannerSchema],
    categoryUrl: { 
        type: String
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
