import { insert_customer } from "../query/reminder_query.js";
import { customer_h_min_two } from "../database/db.js";

export async function createCustomer(req, res){
    // try{
    //     const data = req.body;
    //     const values = [data.data1, data.data2, data.data3, data.data4, data.data5, data.data6, data.data7];
    //     await customer_h_min_two.query(insert_customer, values)
    //     return {message:"succsss"}
    // }catch(error){
    //     return {message:"error",code_error: error.errno}
    // }

    const data = req.body;
    const values = [data.data1, data.data2, data.data3, data.data4, data.data5, data.data6, data.data7];

    const dd = await insertData(values, res);

    return dd;

}

function insertData(values, res) {
    customer_h_min_two.query(insert_customer, values, (err, result) => {
        if (err) {
            console.error('Error saat menyimpan data ke MySQL:', err);
            res.status(500).json({ error: 'Gagal menyimpan data ke MySQL' });
            return;
        }

        console.log('Data berhasil disimpan ke MySQL');
        res.json({ status: 'Data berhasil disimpan ke MySQL' });
    });
}

// async function insertData(data)
// {
//     try{
//         await customer_h_min_two.query(insert_customer, data);
//     //     await customer_h_min_two.query(insert_customer, data, (err, result) => {
//     //     if (err) {
//     //         console.error('Error saat menyimpan data ke MySQL:', err);
//     //         res.status(500).json({ error: 'Gagal menyimpan data ke MySQL' });
//     //         return;
//     //     }

//     //     console.log('Data berhasil disimpan ke MySQL');
//     //     res.json({ status: 'Data berhasil disimpan ke MySQL' });
//     // });
//         return {message:"success"}
//     }catch(error){
//         console.log(error);
//         return {message:"error",code_error: error.errno}
//     }
// }
