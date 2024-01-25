const express = require('express');
const axios = require('axios');
const cron = require('node-cron');
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

// app.get('/api/get_data', (req, res) => {
//   const query = 'SELECT * FROM message_customer WHERE message_h_min_2 = 0';

//   // Jalankan query
//   db.query(query, (err, results) => {
//     if (err) {
//       console.error('Error saat mengambil data dari database:', err);
//       res.status(500).json({ error: 'Gagal mengambil data dari database' });
//       return;
//     }

//     // Kirim hasil query sebagai respons API
//     res.json(results);

//     // Kirim data ke API Node.js lainnya dan lakukan pembaruan di tabel
//     for (let i = 0; i < results.length; i++) {
//       // const nomor = results[i].no_tlpn;
//       // const message = 'Isi pesan yang ingin dikirim';

//       // Kirim data ke API Node.js lainnya
//       spreadSheet(results[i].id_customer);
//     }
//   });
// });

// Jadwalkan cron job setiap hari pukul 12 siang
cron.schedule('0 15 * * *', () => {
  // Jalankan fungsi sesuai jadwal cron
  checkAndRunCronJob();
});

// Fungsi untuk memeriksa nilai field 'message' dan menjalankan cron job jika nilainya 0
function checkAndRunCronJob() {
  // Query untuk memeriksa nilai field 'message' di tabel tertentu
  const query = 'SELECT * FROM message_customer WHERE message_h_min_2 = 0';

  // Jalankan query
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error saat memeriksa nilai field message:', err);
      return;
    }

    // Cek apakah hasil query mengembalikan baris dengan nilai message = 0
    if (results.length > 0) {
      // Jalankan tugas terjadwal atau fungsi yang diinginkan di sini
      yourScheduledFunction();
    }
  });
}
// Fungsi yang akan dijalankan sesuai jadwal
function yourScheduledFunction() {
  console.log('Tugas terjadwal dijalankan!');
  const query = 'SELECT * FROM message_customer WHERE message_h_min_2 = 0';

  // Jalankan query
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error saat mengambil data dari database:', err);
      res.status(500).json({ error: 'Gagal mengambil data dari database' });
      return;
    }
  
    sendWa(results);
  });
}

function sendWa(results){

    for(let i = 0; i < results.length; i++) {

    var termakasih = "Terima kasih atas kepercayaan Anda dalam menggunakan layanan KiosNet."
    var berikut = "Berikut kami informasikan pemberitahuan *2 hari sebelum jatuh tempo* untuk tagihan bulan ini, Untuk dapat terus menikmati layanan kami"
    var namapelangan = "Nama Pelanggan : " + results[i].nama
    var idpelanggan = "ID Pelanggan : " +"*"+results[i].id_customer+"*"
    var paketlayanan = "Paket layanan : "+ results[i].paket
    var harga = "Nominal pembayaran Rp." + results[i].harga
    var periode = "Masa Aktif : "+ results[i].aktif +" - "+ results[i].expired
    var jatuhtmpo = "Jatuh Tempo : "+ results[i].expired
    var a = "Berikut adalah pilihan rekening bank untuk pembayaran transfer."
    var b = "Bank BCA : 0891575636"
    var c = "Bank Mandiri : 1440016162403"
    var d = "A/n : DIMAS HADI PRASTYO"
    var e = "Bank BRI: 6372 0100 2885 504"
    var f = "A/n : ILHAM SAPUTRA W"
    var g = "Jika sudah melakukan pembayaran bukti transfernya dikirimkan ke saya yaa! Terima kasih 🙏☺️"
    var isipesan = decodeURIComponent(termakasih+"\n"+"\n"+berikut+"\n"+"\n"+namapelangan+"\n"+idpelanggan+"\n"+paketlayanan+"\n"+harga+"\n"+periode+"\n"+
                      jatuhtmpo+"\n"+"\n"+a+"\n"+b+"\n"+c+"\n"+d+"\n"+e+"\n"+f+"\n"+"\n"+g);

    const nomor = results[i].no_tlpn;
    const message = isipesan;
    const idCust = results[i].id_customer;

    sendDataToOtherAPI(idCust, nomor, message);

  }
}

// function spreadSheet(idCust){
//   const url_accounting = 'https://script.google.com/macros/s/AKfycbwCua5oMmrtutXZh57s-H1l00NvMtSzKM1TsFPcE1YmwqtC8MFyoApFWeXtBptZHbpl7Q/exec';
//   const headers = {
//     'Content-Type': 'application/x-www-form-urlencoded'
//   };

//   const payload = {
//     'customer_id': idCust
//   };

//   axios.post(url_accounting, payload, headers)
//   .then(response => {
//     console.log('ok.');
//   })

  // try{
  //   axios.post(url_accounting,form, {headers} ,{ timeout:10000 })
  //   data["kirim_accounting"] = true
  //   return {message:"success",code:response.status,couse:""}
  // }catch(error){
  //   if(error.code == "ECONNABORTED"){
  //     return {message:"error",code: error.code,couse:"time out"}
  //   }
  //   if(error.code == "ECONNREFUSED"){
  //     return {message:"error",code: error.code,couse:"server mati"}
  //   }else{
  //     return {message:"error",code: error.code,couse:"uknown reason"}
  //   }
  // }
// }

// Fungsi untuk mengirim data ke API Node.js lainnya
function sendDataToOtherAPI(idCust, nomor, message) {
  // Ganti URL_API_NODEJS_LAIN dengan URL API Node.js lainnya
  const url = 'http://103.184.19.34:2000/send-message';
  const payload = {
     'number' : nomor,
     'message' : message 
    };
  const url_accounting = 'https://script.google.com/macros/s/AKfycbwCua5oMmrtutXZh57s-H1l00NvMtSzKM1TsFPcE1YmwqtC8MFyoApFWeXtBptZHbpl7Q/exec';
  const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
  };
  
  const dd = {
      'customer_id': idCust
    };

  // Kirim permintaan HTTP POST ke API Node.js lainnya
  try{
    const response = axios.post(url,payload)
    const spreadsheet = axios.post(url_accounting, dd, headers)
    return {message:"success",code:response.status,code:spreadsheet.status}
  }catch(error){
    if(error.code == "ECONNABORTED"){
      return {message:"error",code: error.code,couse:"time out"}
    }
    if(error.code == "ECONNREFUSED"){
      return {message:"error",code: error.code,couse:"server mati"}
    }else{
      return {message:"error",code: error.code,couse:"uknown reason"}
    }
  }
  // axios.post(url, payload)
  //   .then(response => {

  //      const updateQuery = 'UPDATE message_customer SET message_h_min_2 = 1 WHERE id = ?';

  //      // Jalankan query pembaruan
  //      db.query(updateQuery, [idCust], (updateErr) => {
  //        if (updateErr) {
  //          console.error('Error saat melakukan pembaruan di tabel:', updateErr);
  //        } else {
  //          console.log('Tabel berhasil diperbarui.');
  //        }
  //      });
  //   })
  //   .catch(error => {
  //     console.error('Error saat mengirim data ke API lain:', error);
  //   });
}

// Fungsi untuk mengupdate nilai field 'message' setelah menjalankan tugas terjadwal
// function updateMessageFieldValue(idCust) {
//   const updateQuery = 'UPDATE message_customer SET message_h_min_2 = 1 WHERE id = ?';

//   // Jalankan query untuk mengupdate nilai field message
//   db.query(updateQuery, (err) => {
//     if (err) {
//       console.error('Error saat mengupdate nilai field message:', err);
//     } else {
//       console.log('Nilai field message diupdate.');
//     }
//   });
// }

// Endpoint untuk menyimpan data ke MySQL
// app.post('/api/simpan_data_mysql', (req, res) => {
//   // Ambil data dari permintaan
//   const data = req.body;

//   // Query untuk menyimpan data ke tabel tertentu
//   const query = 'INSERT INTO message_customer (id_customer, nama, paket, harga, aktif, expired, no_tlpn, message_h_min_2) VALUES (?, ?)';
//   const values = [data.data1, data.data2, data.data3, data.data4, data.data5, data.data6, data.data7, data.data8];

//   // Jalankan query
//   db.query(query, values, (err, result) => {
//     if (err) {
//       console.error('Error saat menyimpan data ke MySQL:', err);
//       res.status(500).json({ error: 'Gagal menyimpan data ke MySQL' });
//       return;
//     }

//     console.log('Data berhasil disimpan ke MySQL');
//     res.json({ status: 'Data berhasil disimpan ke MySQL' });
//   });
// });

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
