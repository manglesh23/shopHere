const express=require('express');
const userrouter = require('./userRouter');
const productrouter=require('./productRouter');
const paymentrouter = require('./payment');
const verifyPaymentRouter = require('./verifyPayment');
const router= express.Router();

router.use('/user',userrouter);
router.use('/product',productrouter);
router.use('/payment',paymentrouter);
router.use('/payment',verifyPaymentRouter);
module.exports=router;
// console.log("router index")