const jwt=require('jsonwebtoken');
const secretAccessToken=process.env.ACCESS_SECRET;
const secretRefreshToken=process.env.REFERSH_SECRET;
const refreshModel=require('../models/refresh_model')

class TokenService{
    generateAccessToken(payload){
        const accessToken=jwt.sign(payload,secretAccessToken,{
            
            expiresIn:'1d'
        })
        return accessToken;
    }
    generateRefreshToken(payload){
        const refreshToken=jwt.sign(payload,secretRefreshToken,{
            expiresIn:'10d'
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
    async verifyRefreshToken(refreshToken){
        return jwt.verify(refreshToken,secretRefreshToken);  
    }
    async findRefreshToken(userId,refreshToken){
        return await refreshModel.findOne({userId:userId,token:refreshToken});
    }
    async updateRefreshToken(userId,refreshToken){
        await refreshModel.updateOne({userId:userId},{token:refreshToken});
   }
   async removeToken(refreshToken){
    return await refreshModel.deleteOne({token:refreshToken});
   }
}
module.exports =new TokenService();