const OtpService=require('../services/otpService')
const hashService=require('../services/hashService');
const userService = require('../services/userService');
const tokenService=require('../services/tokenService');
const UserDto=require('../dtos/userdtos');

class AuthController{
   async sendOtp(req,res){
        const {phone}=req.body;
        if(!phone){
            res.status(400).json({message: 'Invalid phone number'});
        }
        //generate otp from otpservice layer
        const otp=await OtpService.generateOtp();
        // hash the otp
        const t=1000*60*1; // 2 mins time limit for OTP verification
        const exp=Date.now()+t;
        const data=`${phone}.${otp}.${exp}`;
        const hashOtp=await hashService.hashOtp(data.toString());

        // send otp
        try{
            // OtpService.sendBySms(phone,otp);
            res.json({
                hash:`${hashOtp}.${exp}`,
                phone,
                otp
            })
        }catch(err){
            console.log(err);
            res.status(400).json({message:'try again'})
        }

        // res.json({"otp":otp, "hashOtp":hashOtp})
    }
    async verifyOtp(req,res){
        const {otp,hash,phone} = req.body;
        if(!otp || !hash || !phone){
            res.status(400).json({message:"All fields must be filled out."});
        }

        const [hashedOtp,exp]=hash.split('.');
        if(Date.now()>exp){
            res.status(400).json({message:"OTP expired"});
        }
        const data=`${phone}.${otp}.${exp}`;
        const isValid=OtpService.verifyOtp(hashedOtp,data);
        if(!isValid){
            res.status(400).json({message:"Invalid otp"});
        }
        let user;
        let accessToken;
        let refreshToken;

        try{
            user=await userService.findUser({phone})
            if(!user){
               user=await userService.createUser({phone})
               console.log(user);
            }
            
        }catch(e){
            console.log(e);
            res.status(400).json({message:"DB error"});
        }

        // JWTToken generate
        accessToken=tokenService.generateAccessToken({_id:user._id,activated:false})
        refreshToken=tokenService.generateRefreshToken({_id:user._id,activated:false})

        await tokenService.storeRefreshToken(refreshToken,user._id)


        res.cookie('refreshtoken',refreshToken,{
            maxAge:1000*60*60*24*30,
            httpOnly:true,     //js cant read only server can access
        })
        res.cookie('accesstoken',accessToken,{
            maxAge:1000*60*60*24*30,
            httpOnly:true,
        })

        const userDto=new UserDto(user);
        res.json({auth:true,user:userDto})
    }
}

module.exports=new AuthController();