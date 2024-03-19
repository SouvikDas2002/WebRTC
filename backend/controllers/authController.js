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
        const t=1000*60*2; // 2 mins time limit for OTP verification
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


        res.cookie('refreshToken',refreshToken,{
            maxAge:1000*60*60*24*30,
            httpOnly:true,     //js cant read only server can access
        })
        res.cookie('accessToken',accessToken,{
            maxAge:1000*60*60*24*30,
            httpOnly:true,
        })

        const userDto=new UserDto(user);
        res.json({auth:true,user:userDto})
    }

    async refresh(req,res){
        const {refreshToken:refreshTokenFromCookie}=req.cookies;
        let userData;
        try{
            userData= await tokenService.verifyRefreshToken(refreshTokenFromCookie);
        }catch(err){
            return res.status(401).json({message:'invalid Token1'})
        }
        // console.log(userData);
        try{
            const token =await tokenService.findRefreshToken(userData._id,refreshTokenFromCookie)
            if(!token){
                return res.status(404).json({message:'Invalid token2'});
            }
        }catch(err){
            return res.status(500).json({message:'Internal error'});
        }
        
        const user=await userService.findUser({_id:userData._id});
        // console.log(user);
        if(!user){
            return res.status(404).json({message:'No user'})
        }
        const refreshToken=tokenService.generateRefreshToken({_id:userData._id})
        const accessToken=tokenService.generateAccessToken({_id:userData._id})

        try{
            await tokenService.updateRefreshToken(userData._id,refreshToken);
        }catch(err){
            return res.status(404).json({message:'Internal error'});
        }

        res.cookie('refreshToken',refreshToken,{
            maxAge:1000*60*60*24*30,
            httpOnly:true,
        })
        res.cookie('accessToken',accessToken,{
            maxAge:1000*60*60*24*30,
            httpOnly:true,
        })

        const userDto=new UserDto(user);
        res.json({user:userDto,auth:true});
    }
    async logout(req,res){
        try{
        const {refreshToken}=req.cookies;
        await tokenService.removeToken(refreshToken);

        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');
        res.json({user:null,auth:false});
        }catch(err){
            console.log(err)
        }
    }
}

module.exports=new AuthController();