

import express from 'express';
import {PORT} from './config.js';
import recipeRoutes from './routes/recipe.routes.js'
import ingredientRoutes from './routes/ingredient.routes.js'
import recipeIngredientRoutes from './routes/recipeingredients.routes.js';
import categoryRoutes from './routes/category.routes.js'
import registrationRoutes from './routes/registration.routes.js'
import loginRoutes from './routes/login.routes.js'
import favoritesRoutes from './routes/favorites.routes.js'
import cors from 'cors'
import {pool} from './db.js';

console.log({
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT,
  });


const app = express();
app.use(express.json());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(cors());

app.use(recipeRoutes);
app.use(ingredientRoutes);
app.use(recipeIngredientRoutes);
app.use(categoryRoutes);
app.use(registrationRoutes);
app.use(loginRoutes);
app.use(favoritesRoutes);

app.listen(PORT)
console.log('Server on port ' + PORT);