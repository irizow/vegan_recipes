import {pool } from '../db.js'

export const getRecipes = async (req, res) => {
    const {rows} = await pool.query('SELECT * FROM recipes');
    res.json(rows);
}

export const getRecipe =  async (req, res) => {
    const {id} = req.params;
    const {rows} = await pool.query(`SELECT * FROM recipes WHERE id = ${id}`);
    if (rows.length === 0) {
        return res.send('Recipe not found');
    }
    res.send(rows);
}

export const postRecipe =  async (req, res) => {
    const {name, instructions, calories_per_100, time, image, ingredientIds, categoryIds} = req.body;
    let parsedInstructions;
    try {
        parsedInstructions = Array.isArray(instructions)
            ? instructions
            : JSON.parse(instructions); // Parse if it's a JSON string
    } catch (err) {
        return res.status(400).send("Invalid instructions format");
    }
    console.log('parsed +', parsedInstructions);

    try {
        const imageBuffer = image ? Buffer.from(image, "base64") : '';

        const result = await pool.query(
        `INSERT INTO recipes(name, instructions, calories_per_100, time, image) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
         [name, parsedInstructions, calories_per_100, time, imageBuffer])
            
    

        const recipeId = result.rows[0].id;

        const categoryPromises = categoryIds.map((categoryId) =>
            pool.query(`
                INSERT INTO recipe_tags (recipe_id, tag_id) VALUES($1, $2)`,
            [recipeId, categoryId]))
    
            console.log('tags + ', categoryIds);

        const ingredientPromises = ingredientIds.map((ingredientId) => 
        pool.query(
            `INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES ($1, $2)`,
             [recipeId, ingredientId])
        
    )
    await Promise.all(ingredientPromises);
    await Promise.all(categoryPromises);

    console.log('recipe created')
    res.status(201).json({success: true, recipeId});
    
    }

    catch (err) {
        console.log(err);
        res.status(500).send('Internal server error')

    }
}

export const deleteRecipe =  async (req, res) => {
    const {id} = req.params;
    try {
    const {rows} = await pool.query(`DELETE FROM recipes WHERE id = $1 RETURNING id`, [id]);
    if (rows.length === 0) {
        return res.status(400).send('Recipe not found')
    }
    res.status(200).send(`recipe with id ${id} has been deleted`)
    }
     catch (err) {
        console.log('Error deleting recipe ', err)
        res.status(500).send('Internal server error')
     }
}

export const updateRecipe = async (req, res) => {
    const {id} = req.params;
    try {
    const {name, instructions, calories_per_100, time} = req.body;
    const result = await pool.query('UPDATE recipes SET name = $1, instructions = $2, calories_per_100 = $3, time = $4 WHERE id = $5', [name, instructions, calories_per_100, time, id])
    if (result.rowCount === 0) {
        return res.status(404).send('Recipe not found');
    }
    res.status(200).send('Recipe updated');
    }
    catch (err) {
        console.log('Error updating recipe', err)
        res.status(500).send('Internal server err')
    }
}