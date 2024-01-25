// const express = require('express');
import express from "express"
import { createCustomer } from './controllers/CreateCustomerController.js';
import mysql from "mysql2"
import dotenv  from "dotenv"
dotenv.config()

const app = express();
const PORT = process.env.PORT_RUNNING;

const db = mysql.createConnection({
    host    : process.env.DB_DASARATA_HOST,
    user    : process.env.DB_DASARATA_USER,
    password: process.env.DB_DASARATA_PASS,
    database: process.env.DB_DASARATA_DATABASE,
  });
  
  // Hubungkan ke database
  db.connect(err => {
    if (err) {
      console.error('Error koneksi ke database:', err);
      return;
    }
    console.log('Terhubung ke database MySQL');
  });

app.use(express.json());

app.post('/api/store-customer', [createCustomer]);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});