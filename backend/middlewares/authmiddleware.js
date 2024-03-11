const tokenService = require("../services/tokenService");

module.exports=async function(req,res,next){
    try{
        const {accessToken}=req.cookies;
        // console.log(accessToken);
        if(!accessToken){
            
            res.status(401).json({message:"no token"})
        }
        const userData=await tokenService.verifyToken(accessToken)
        if(!userData){
            res.status(401).json({message:"Invalid"})
            
        }
        req.user=userData;
        next();
    }catch(err){
        res.status(401).json({message:"Invalid token"})
    }
}