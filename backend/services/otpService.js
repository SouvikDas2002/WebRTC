const crypto=require('crypto');
const hashService=require('./hashService')
const smsSid=process.env.SMS_SID;
const smsAuthToken=process.env.SMS_AUTH;
const twilio=require('twilio')(smsSid,smsAuthToken,{
    lazyLoading:true
});

class OtpService{
    async generateOtp(){
        const otp=crypto.randomInt(1000,9999);
        return otp;
    }
   async sendBySms(phone,otp){
        return await twilio.messages.create({
            to:phone,
            from:process.env.SMS_FROM_NUMBER,
            body:`Your Dev House OTP is ${otp}`
        })
    }
   async verifyOtp(hashedOtp,data){
        let newHash=hashService.hashOtp(data)
        if(newHash===hashedOtp){
            return true;
        }
        return false;
    }

    sendByMail(){}
}

module.exports =new OtpService();