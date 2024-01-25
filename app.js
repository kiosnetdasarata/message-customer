const express = require('express');
import { createCustomer } from "./controllers/CreateCustomerController";

const app = express();
const PORT = process.env.PORT_RUNNING;
app.use(express.json());

app.post('/api/store-customer', [createCustomer]);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});