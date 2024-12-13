const express=require('express');
const { createProduct } = require('../controller/product');

const productRouter= express.Router();

productRouter.post('/createproduct',createProduct);

module.exports=productRouter;
