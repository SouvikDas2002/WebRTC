const otp=require('express').Router();
const AuthController=require('./controllers/authController')

otp.post('/api/sendOtp',AuthController.sendOtp)
otp.post('/api/verifyOtp',AuthController.verifyOtp)

module.exports = otp;