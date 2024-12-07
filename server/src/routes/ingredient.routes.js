import {Router} from 'express';
import { getIngredients, getIngredient, postIngredient, deleteIngredient, updateIngredient } from '../controllers/ingredient.controllers.js';

const router = Router();

router.get('/ingredients', getIngredients);

router.get('/ingredient/:id', getIngredient);

router.post('/ingredients', postIngredient);

router.delete('/ingredient/:id', deleteIngredient);

router.put('/ingredient/:id', updateIngredient);

export default router;