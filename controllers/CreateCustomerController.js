import { insert_customer } from "../query/reminder_query";

export async function createCustomer(data){
    try{
        const data = req.body;
        const values = [data.data1, data.data2, data.data3, data.data4, data.data5, data.data6, data.data7];
        await insert_customer.query(values)
        return {message:"succsss"}
    }catch(error){
        return {message:"error",code_error: error.errno}
    }
}
