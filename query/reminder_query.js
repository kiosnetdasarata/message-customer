export const query_min_two = 'SELECT * FROM reminder_min_two WHERE message = 0';

export const insert_customer = 'INSERT INTO reminder_min_two (id_customer, nama, paket, harga, aktif, expired, no_tlpn) VALUES (?)';

export const update_customer = 'UPDATE reminder_min_two SET message = 1 WHERE id = ?';