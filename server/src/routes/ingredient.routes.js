import {Router} from 'express';
import { getIngredients, getIngredient, postIngredient, deleteIngredient, updateIngredient } from '../controllers/ingredient.controllers.js';

const router = Router();

router.get('/api/ingredients', getIngredients);

router.get('/api/ingredient/:id', getIngredient);

router.post('/api/ingredients', postIngredient);

router.delete('/api/ingredient/:id', deleteIngredient);

router.put('/api/ingredient/:id', updateIngredient);

export default router;