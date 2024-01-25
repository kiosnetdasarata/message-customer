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

// app.post('/api/store-customer', createCustomer);

// Endpoint untuk menyimpan data ke MySQL
app.post('/api/store-customer', (req, res) => {
  // Ambil data dari permintaan
  const data = req.body;

  // Query untuk menyimpan data ke tabel tertentu
  const query = 'INSERT INTO reminder_min_two (id_customer, nama, paket, harga, aktif, expired, no_tlpn) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [data.data1, data.data2, data.data3, data.data4, data.data5, data.data6, data.data7];

  // Jalankan query
  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error saat menyimpan data ke MySQL:', err);
      res.status(500).json({ error: 'Gagal menyimpan data ke MySQL' });
      return;
    }

    console.log('Data berhasil disimpan ke MySQL');
    res.json({ status: 'Data berhasil disimpan ke MySQL' });
  });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});