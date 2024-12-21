const express=require('express');
const { verifyPayment } = require('../controller/verifyPayment');
const verifyPaymentRouter=express.Router();

verifyPaymentRouter.post('/verifypayment',verifyPayment);

module.exports=verifyPaymentRouter;