const express=require('express');
const userrouter = require('./userRouter');
const productrouter=require('./productRouter');
const paymentrouter = require('./payment');
const verifyPaymentRouter = require('./verifyPayment');
const sendEmailNotificatoionRouter = require('./sendEmailRouter');
const cartRouter=require('./cartRouter');
const orderrouter = require('./orderRouter');
const router= express.Router();

router.use('/user',userrouter);
router.use('/product',productrouter);
router.use('/payment',paymentrouter);
router.use('/payment',verifyPaymentRouter);
router.use('/send',sendEmailNotificatoionRouter);
router.use('/cart',cartRouter);
router.use('/order',orderrouter);
module.exports=router;
// console.log("router index")