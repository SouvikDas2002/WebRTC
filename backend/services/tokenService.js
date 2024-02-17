const jwt=require('jsonwebtoken');
const secretAccessToken=process.env.ACCESS_SECRET;
const secretRefreshToken=process.env.REFERSH_SECRET;

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
}
module.exports =new TokenService();