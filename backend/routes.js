const otp=require('express').Router();
const AuthController=require('./controllers/authController')

otp.post('/api/sendOtp',AuthController.sendOtp)

module.exports = otp;