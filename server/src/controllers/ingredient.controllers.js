import { pool } from '../db.js'

export const getIngredients = async (req, res) => {
    const {rows} = await pool.query('SELECT * FROM ingredients');
    res.json(rows);
}

export const getIngredient =  async (req, res) => {
    const {id} = req.params;
    const {rows} = await pool.query(`SELECT * FROM ingredients WHERE id = $1`, [id]);
    if (rows.length === 0) {
        return res.send('Ingredient not found');
    }
    res.send(rows);
}

export const postIngredient =  async (req, res) => {
    try {
    const {name, calories_per_100, category} = req.body;
    const result = await pool.query(`INSERT INTO ingredients(name, calories_per_100, category ) VALUES ($1, $2, $3) RETURNING *`, [name, calories_per_100, category])
    if (result.rowCount === 0) {
        return res.status(404).send('Ingredient not added');
    }
    res.status(200).send('ingredient added');
    }
    catch (err) {
        res.status(500).send('Internal server error', err)
    }
}

export const deleteIngredient =  async (req, res) => {
    const {id} = req.params;
    try {
    const {rows} = await pool.query(`DELETE FROM ingredient WHERE id = $1 RETURNING id`, [id]);
    if (rows.length === 0) {
        return res.status(400).send('Ingredient not found')
    }
    res.status(200).send(`Ingredient with id ${id} has been deleted`)
    }
     catch (err) {
        console.log('Error deleting ingredient ', err)
        res.status(500).send('Internal server error')
     }
}

export const updateIngredient = async (req, res) => {
    const {id} = req.params;
    try {
    const {name, calories_per_100, category} = req.body;
    const result = await pool.query('UPDATE ingredients SET name = $1, calories_per_100 = $2, category = $3 WHERE id = $4', [name, calories_per_100, category, id])
    if (result.rowCount === 0) {
        return res.status(404).send('Ingredient not found');
    }
    res.status(200).send('ingredient updated');
    }
    catch (err) {
        console.log('Error updating ingredient', err)
        res.status(500).send('Internal server err')
    }
}