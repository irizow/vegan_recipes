import { pool } from "../db.js";

export const getCategories = async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM tags')
    res.json(rows);
}

export const getCategoryRecipes = async (req, res) => {
    const {rows} = await pool.query('SELECT * FROM recipe_tags')
    res.json(rows);
}