import {Router} from 'express';

import { getRecipes, getRecipe, postRecipe, deleteRecipe, updateRecipe } from '../controllers/recipe.controllers.js';

const router = Router();

router.get('/recipes', getRecipes);

router.get('/recipe/:id', getRecipe);

router.post('/recipes/', postRecipe);

router.delete('/recipe/:id', deleteRecipe);

router.put('/recipe/:id', updateRecipe);

export default router;