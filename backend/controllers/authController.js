const OtpService=require('../services/otpService')
const hashService=require('../services/hashService');
const otpService = require('../services/otpService');

class AuthController{
   async sendOtp(req,res){
        const {phone}=req.body;
        if(!phone){
            res.status(400).json({message: 'Invalid phone number'});
        }
        //generate otp from otpservice layer
        const otp=await OtpService.generateOtp();
        // hash the otp
        const t=1000*60*2; // 2 mins time limit for OTP verification
        const exp=Date.now()+t;
        const data=`${phone}.${otp}.${exp}`;
        const hashOtp=await hashService.hashOtp(data.toString());

        // send otp
        try{
            otpService.sendBySms(phone,otp);
            res.json({
                hash:`${hashOtp}.${exp}`,
                phone,
            })
        }catch(err){
            console.log(err);
            res.status(400).json({message:'try again'})
        }

        // res.json({"otp":otp, "hashOtp":hashOtp})
    }
}

module.exports=new AuthController();