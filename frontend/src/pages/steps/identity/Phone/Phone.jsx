import React, { useState } from 'react'
import Button from '../../../../components/shared/Button/Button'
import Card from '../../../../components/shared/Card/Card'
import TextInput from '../../../../components/shared/TextInput/TextInput'
import Style from '../Identity.module.css'
import { sendOtp } from '../../../../http'
import { useDispatch } from 'react-redux' // for store data into slice
import { setOtp } from '../../../../store/authSlice'

const Phone = ({onNext}) => {
  const [number, setNumber] = useState("");
  const dispatch=useDispatch();

  async function handleOtp(){
    const res=await sendOtp({phone:number});
    console.log(res.data);
    dispatch(setOtp({phone:res.data.phone,hash:res.data.hash})); //send to action in auth slice
    onNext();
  }

  return (
    <Card title="Enter Your Phone Number" icon="phone">
      <TextInput type="number" value={number} onChange={(e) => setNumber(e.target.value)} />
      <div>
        <div className={Style.actionbtnWrap}>
          <Button text="Next" logo="arrow-forward" onclick={handleOtp}/>
        </div>
        <p className={Style.bottompara}>
          By entering your number, you’re agreeing to our
          Terms of Service and Privacy Policy. Thanks!
        </p>
      </div>
    </Card>
  )
}

export default Phone