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
    title: { 
        type: String, 
        required: true
    },
    categoryBanner: [categoryBannerSchema],
    categoryUrl: { type: String, required: true },
    /* children: [Object] */
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
