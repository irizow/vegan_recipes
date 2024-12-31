import { Router } from "express";
import { getCategories, getCategoryRecipes } from "../controllers/category.controllers.js";


const router = Router();

router.get('/api/categories', getCategories);

router.get('/api/categoryrecipes', getCategoryRecipes);

export default router;