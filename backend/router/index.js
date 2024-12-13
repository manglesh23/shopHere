const express=require('express');
const userrouter = require('./userRouter');
const router= express.Router();

router.use('/user',userrouter);

module.exports=router;
console.log("router index")