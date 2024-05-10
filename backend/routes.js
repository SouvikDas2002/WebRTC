const otp=require('express').Router();
const AuthController=require('./controllers/authController')
const ActivateController=require('./controllers/activateController');
const authmiddleware = require('./middlewares/authmiddleware');
const roomsController=require('./controllers/roomsController');

otp.post('/api/sendOtp',AuthController.sendOtp)
otp.post('/api/verifyOtp',AuthController.verifyOtp)
otp.post('/api/activate',authmiddleware,ActivateController.activate)
otp.get('/api/refresh',AuthController.refresh);
otp.post('/api/logout',authmiddleware,AuthController.logout)
otp.post('/api/rooms',authmiddleware,roomsController.create);
otp.get('/api/rooms',authmiddleware,roomsController.index)
otp.get('/api/rooms/:roomId',authmiddleware,roomsController.show)

module.exports = otp;