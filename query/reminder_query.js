export const query_min_two = 'SELECT * FROM reminder_min_two WHERE message = 0';

export const insert_customer = 'INSERT INTO message_customer (id_customer, nama, paket, harga, aktif, expired, no_tlpn) VALUES (?, ?, ?, ?, ?, ?, ?)';

export const update_customer = 'UPDATE message_customer SET message = 1 WHERE id = ?';