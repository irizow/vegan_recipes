import { Router } from "express";
import { getCategories, getCategoryRecipes } from "../controllers/category.controllers.js";


const router = Router();

router.get('/categories', getCategories);

router.get('/categoryrecipes', getCategoryRecipes);

export default router;