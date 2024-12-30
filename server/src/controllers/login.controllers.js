import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db.js";

export const postLogin = async(req, res) => {
    const {username, password} = req.body

    try {
        const existingUser = await pool.query(`SELECT FROM users WHERE email = 1$ OR username = $1`, [username]);

        if(existingUser.rows.length === 0) {
            return res.status(401).send('User not found')
        }

        const user = existingUser.rows[0];

        const correctPassword = await bcrypt.compare(password, user.password)

        if(!correctPassword) {
            return res.status(401).send('Invalid password');
        }

        const token = jwt.sign(
            {userId: user.id, username: user.username},
            process.env.JWT_SECRET,
            { expiresIn: '1h'}
        );

        res.status(200).json({message: 'Login Successful', token})

    } catch(err) {
        res.status(500).send('Internal server error')
    }
}