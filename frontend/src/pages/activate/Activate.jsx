import React, { useState } from 'react'
import Name from '../steps/name/Name'
import Profile from '../steps/profile/Profile'

const steps={
  1:Name,
  2:Profile
}

const Activate = () => {
  const [step,setStep]=useState(1);
  const Step=steps[step];

  function onNext(){
    setStep(step+1);
  }
  return (
    <div>
      <Step onNext={onNext}/>
    </div>
  )
}

export default Activate