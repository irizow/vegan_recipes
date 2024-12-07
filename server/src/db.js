import dotenv from 'dotenv';
dotenv.config({ path: '../.env'});
import pg from 'pg';

const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;

export const pool = new pg.Pool({
    user: dbUser,
    host: dbHost,
    password: dbPassword,
    database: dbName,
    port: dbPort,
})

