import express from "express";
import asyncHandler from "express-async-handler";
import Category from "./../Models/CategoryModel.js";
import { admin, protect } from "./../Middleware/AuthMiddleware.js";

const categoryRoute = express.Router();


// ADMIN GET ALL PRODUCT WITHOUT SEARCH AND PAGINATION
categoryRoute.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const categories = await Category.find({}).sort({_id: -1})
    res.json(categories)
  })
);



// GET SINGLE CATEGORY
categoryRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category) {
      res.json(category);
    } else {
      res.status(404);
      throw new Error("Category not Found");
    }
  })
);


// DELETE ADMIN CATEGORY
categoryRoute.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category) {
      await category.remove();
      res.json({message: "Category deleted"})
    } else {
      res.status(404);
      throw new Error("Category not Found");
    }
  })
);


// CREATE CATEGORY
categoryRoute.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const {isEnabled,categoryName,categoryBanner,categoryUrl} = req.body;
    const categoryExist = await Category.findOne({name});
    if (categoryExist) {
      res.status(400);
      res.json({message: "Category name already exists"})
    } else {
      const category = new Category({
        isEnabled,
        categoryName,
        categoryBanner,
        categoryUrl,
      })
      if(category){
        const createdcategory = await category.save()
        res.status(201).json(createdcategory);
      }else{  
        res.status(400);
        throw new Error("Invalid category data");
      }
    }
  })
);


// UPDATE CATEGORY
categoryRoute.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const {isEnabled,categoryName,categoryBanner,categoryUrl} = req.body;
    const category = await Category.findById(req.params.id);
    if (category) {
        category.isEnabled = isEnabled || category.isEnabled;
        category.categoryName = categoryName || category.categoryName;
        category.categoryBanner = categoryBanner || category.categoryBanner;
        category.categoryUrl = categoryUrl || category.categoryUrl;      

      const updatedCategory = await category.save()
      res.json(updatedCategory);

    } else {
      res.status(404);
      throw new Error("Category not found");
    }
  })
);


export default categoryRoute;
