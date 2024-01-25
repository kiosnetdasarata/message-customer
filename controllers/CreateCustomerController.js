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

    const dd = await insertData(values);

    return dd;

}

async function insertData(data)
{
    try{
        await customer_h_min_two.query(insert_customer, [data]);
        return {message:"succsss"}
    }catch(error){
        return {message:"error",code_error: error.errno}
    }
}
