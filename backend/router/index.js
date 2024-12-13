const express=require('express');
const userrouter = require('./userRouter');
const productrouter=require('./productRouter');
const router= express.Router();

router.use('/user',userrouter);
router.use('/product',productrouter);
module.exports=router;
// console.log("router index")