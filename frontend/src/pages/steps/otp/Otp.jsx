import React, { useState } from 'react'
import Card from '../../../components/shared/Card/Card'
import Style from './Otp.module.css'
import Button from '../../../components/shared/Button/Button'
import TextInput from '../../../components/shared/TextInput/TextInput'

const Otp = ({onNext}) => {
  const [otp,setOtp]=useState('')
  return (
    <>
    <div className={Style.cardWrapper}>
    <Card title="Enter Your code just recently sent" icon="lock-emoji">
      <TextInput value={otp} type="number" onChange={(e) => setOtp(e.target.value)} />
      <div>
        <div className={Style.actionbtnWrap}>
          <Button text="Next" logo="arrow-forward" onclick={onNext}/>
        </div>
        <p className={Style.bottompara}>
          By entering your number, you’re agreeing to our
          Terms of Service and Privacy Policy. Thanks!
        </p>
      </div>
    </Card>
    </div>
    </>
  )
}

export default Otp