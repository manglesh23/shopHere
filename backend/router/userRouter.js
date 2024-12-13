const express=require('express');
const { createUser, userlogIn } = require('../controller/user');

const userrouter=express.Router();

userrouter.post('/createuser',createUser);
userrouter.post('/login',userlogIn);

module.exports=userrouter;
// console.log("router user")