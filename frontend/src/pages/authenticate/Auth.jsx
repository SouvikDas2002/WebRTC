import React, { useState } from 'react'
import Identity from '../steps/identity/Identity'
import Otp from '../steps/otp/Otp'

const steps={
    1:Identity,
    2:Otp
}

const Auth = () => {
    const[step,setStep] =useState(1);
    const Step=steps[step];
    function onNext(){
        setStep(step+1);
    }
  return (
    <>
    <Step onNext={onNext}/>
    </>
  )
}

export default Auth