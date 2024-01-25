import mysql from 'mysql2';
import dotenv  from "dotenv"
dotenv.config()

export const customer_h_min_two = mysql.createPool({
    host    : process.env.DB_DASARATA_HOST,
    user    : process.env.DB_DASARATA_USER,
    password: process.env.DB_DASARATA_PASS,
    database: process.env.DB_DASARATA_DATABASE,
}).promise()