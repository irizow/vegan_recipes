import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db.js";

export const postLogin = async(req, res) => {
    const {username, password} = req.body
    

    try {
        const existingUser = await pool.query(`SELECT * FROM users WHERE email = $1 OR username = $2`, [username, username]);

        if(existingUser.rows.length === 0) {
            return res.status(401).json({message: 'User not found'})
        }

        const user = existingUser.rows[0];

        const correctPassword = await bcrypt.compare(password, user.password)

        if(!correctPassword) {
            return res.status(401).json({message: 'Invalid password'});
        }

        const token = jwt.sign(
            {userId: user.id, username: user.username},
            process.env.JWT_SECRET,
            { expiresIn: '1h'}
        );

        res.status(200).json({message:'Login Successful', token})

    } catch(err) {
        console.error('Error during login:', err);
        res.status(500).json({message: 'Internal server error'})
    }
}