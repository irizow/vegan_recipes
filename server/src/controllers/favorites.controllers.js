import { pool } from "../db.js";

export const getFavorites = async (req, res) => {
    const {userId} = req.params;
    const {rows} = await pool.query(`SELECT * FROM favorites WHERE user_id = $1`, [userId])
    if (rows.length === 0) {
        return res.send("You don't have favorites yet");
    }
    const recipeIds = rows.map(row => row.recipe_id);
    const recipeResults = await pool.query(`SELECT * FROM recipes WHERE id = ANY($1)`, [recipeIds])
    if(recipeResults.rows.length === 0) {
        res.status(404).send('Recipes not found')
    }
    res.status(200).json(recipeResults.rows)
}

export const postFavorite = async (req, res) => {
    try {
        const {userId, recipeId} = req.body;

        if (!userId || !recipeId) {
            return res.status(400).send('User ID and Recipe ID are required');
        }

        const result = await pool.query(`INSERT INTO favorites(user_id, recipe_id) VALUES ($1, $2) RETURNING *`, [userId, recipeId]);
        if(result.rowCount === 0) {
            return res.status(400).send('Favorite not added')
        }
        res.status(200).send('Recipe added to favorites')
    }
    catch(err) {
        console.error('Error adding favorite', err)
        res.status(500).send('Internal server error')
    }

}

export const deleteFavorite = async (req, res) => {
    const {recipeId, userId} = req.body;

    try {
       const {rows} = await pool.query(`DELETE FROM favorites WHERE recipe_id = $1 AND user_id = $2 RETURNING recipe_id`, [recipeId, userId]);
       if(rows.length === 0) {
        return res.status(400).send('Favorite not deleted')
       }
       res.status(200).send(`Recipe ${recipeId} removed from favorites`)
    }

    catch(err) {
        res.status(500).send('Internal server error', err.message)
    }
}

