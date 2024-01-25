const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Konfigurasi koneksi ke database
const db = mysql.createConnection({
  host: '103.184.19.8',
  user: 'dasarata',
  password: 'garuda@2022!',
  database: 'database_coba'
});

// Hubungkan ke database
db.connect(err => {
  if (err) {
    console.error('Error koneksi ke database:', err);
    return;
  }
  console.log('Terhubung ke database MySQL');
});

// Endpoint untuk menyimpan data ke MySQL
app.post('/api/simpan_data_mysql', (req, res) => {
  // Ambil data dari permintaan
  const data = req.body;

  // Query untuk menyimpan data ke tabel tertentu
  const query = 'INSERT INTO message_customer (id_customer, nama, paket, harga, aktif, expired, no_tlpn, message_h_min_2) VALUES (?, ?)';
  const values = [data.data1, data.data2, data.data3, data.data4, data.data5, data.data6, data.data7, data.data8];

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

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
