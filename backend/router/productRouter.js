const express=require('express');
const { createProduct, getProduct } = require('../controller/product');
const { verifytoken } = require('../helper/verifyToken');

const productRouter= express.Router();

productRouter.post('/createproduct',verifytoken,createProduct);
productRouter.get('/getproduct',getProduct);

module.exports=productRouter;
