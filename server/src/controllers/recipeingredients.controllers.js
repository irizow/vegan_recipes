import { pool } from "../db.js";

export const getRecipeIngredients = async(req, res) => {
    const {rows} = await pool.query('SELECT * FROM recipe_ingredients;');
    res.json(rows);
}