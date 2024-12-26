const express=require('express');
const { sendEmailNotification } = require('../controller/sendEmail');
const sendEmailNotificatoionRouter= express.Router();

sendEmailNotificatoionRouter.post('/sendemail',sendEmailNotification);

module.exports=sendEmailNotificatoionRouter;