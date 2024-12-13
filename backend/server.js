const express= require('express');
const cors=require('cors');
const { connectDatabase } = require('./databaseConnection/databaseConnection');
const router = require('./router/index');
require('dotenv').config();
const PORT= process.env.PORT;
const app= express();

app.use(express.json());
app.use(cors());
app.use('/',router);


connectDatabase().then(()=>{
app.listen(PORT,()=>{
    console.log(`listening at ${PORT}`);
})
}).catch((error)=>{
    throw error
})



