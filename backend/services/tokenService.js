const jwt=require('jsonwebtoken');
const secretAccessToken=process.env.ACCESS_SECRET;
const secretRefreshToken=process.env.REFERSH_SECRET;
const refreshModel=require('../models/refresh_model')

class TokenService{
    generateAccessToken(payload){
        const accessToken=jwt.sign(payload,secretAccessToken,{
            
            expiresIn:'1h'
        })
        return accessToken;
    }
    generateRefreshToken(payload){
        const refreshToken=jwt.sign(payload,secretRefreshToken,{
            expiresIn:'1y'
        })
        return refreshToken;
    }
    async storeRefreshToken(token,userId){
        try{
           await refreshModel.create({
                token,userId
            })
        }catch(err){
            console.log(err.message);
        }
    }
    async verifyToken(token){
        return jwt.verify(token,secretAccessToken);
    }
}
module.exports =new TokenService();