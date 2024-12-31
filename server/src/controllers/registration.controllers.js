import { pool } from "../db.js";
import bcrypt from 'bcrypt'


export const postRegistration = async(req, res) => {
    const { username, password, email } = req.body;

    try {
    const existingUser = await pool.query(`SELECT * FROM users WHERE email = $1 OR username = $2`, [email, username]);

    if(existingUser.rows.length > 0) {
        return res.status(400).json({message:'This usarname is taken, try another one'})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(`INSERT INTO users(username, password, email) VALUES($1, $2, $3)`, [username, hashedPassword, email]);

    res.status(201).send("User created successfully");

    } catch(err) {
        console.log(err);

        res.status(500).send('Internal server error')
    }
}