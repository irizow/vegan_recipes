import { Router } from "express";
import { getRecipeIngredients } from "../controllers/recipeingredients.controllers.js";

const router = Router();

router.get('/api/recipe_ingredients', getRecipeIngredients);

export default router;