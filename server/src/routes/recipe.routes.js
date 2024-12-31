import {Router} from 'express';

import { getRecipes, getRecipe, postRecipe, deleteRecipe, updateRecipe } from '../controllers/recipe.controllers.js';

const router = Router();

router.get('/api/recipes', getRecipes);

router.get('/api/recipe/:id', getRecipe);

router.post('/api/recipes/', postRecipe);

router.delete('/api/recipe/:id', deleteRecipe);

router.put('/api/recipe/:id', updateRecipe);

export default router;