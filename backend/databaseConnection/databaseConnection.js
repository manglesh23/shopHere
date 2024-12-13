const mongoose=require('mongoose');
require('dotenv').config();

const MONGO_URI=process.env.MONGO_URI;

const connectDatabase=async()=>{
    try{
    await mongoose.connect(MONGO_URI);
    console.log("Connection Established");
    }catch(e){
        console.log("Faild to Connect");
        throw e;
    }
}

module.exports={connectDatabase};