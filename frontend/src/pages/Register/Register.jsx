import React, { useState } from 'react'
import Identity from '../steps/identity/Identity';
import Otp from '../steps/otp/Otp';
import Name from '../steps/name/Name';
import Profile from '../steps/profile/Profile';
import UserName from '../steps/username/UserName';


const steps={
    1:Identity,
    2:Otp,
    3:Name,
    4:Profile,
    5:UserName
}

const Register=(()=> {
    const [step,setStep]=useState(1);
    const Step=steps[step];

    function onNext(){
        setStep(step+1);
    }
    return (
        <div className='wrapper'>
            <Step onNext={onNext}/>
        </div>
    )
})

export default Register
