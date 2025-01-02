import Router from 'express';
import { deleteFavorite, getFavorites, postFavorite } from '../controllers/favorites.controllers.js';

const router = Router();

router.get('/api/favorites/:userId', getFavorites);

router.post('/api/favorites', postFavorite);

router.delete('/api/favorites', deleteFavorite);

export default router;