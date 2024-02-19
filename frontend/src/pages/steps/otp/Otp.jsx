import React, { useState } from 'react'
import Card from '../../../components/shared/Card/Card'
import Style from './Otp.module.css'
import Button from '../../../components/shared/Button/Button'
import TextInput from '../../../components/shared/TextInput/TextInput'
import { sendOtp, verifyOtp } from '../../../http'
import { useSelector } from 'react-redux' //fetch data from our redux store
import {setAuth, setOtp} from '../../../store/authSlice'
import { useDispatch } from 'react-redux'

const Otp = ({onNext}) => {
  const [otp,setInputOtp]=useState('')
  const dispatch=useDispatch();
  const dataFromStore=useSelector((state)=>state.auth.otp) //dataFromStore or {phone,hash} retrive this value from slice

  async function resendOtp(){
    try{
    const res=await sendOtp({phone:dataFromStore.phone})
    console.log(res.data);
    dispatch(setOtp({phone:res.data.phone,hash:res.data.hash})); 
    }catch(err){
      console.log(err);
    }
  }

  async function handleSubmit(){
    try{
      if(otp){
      const res=await verifyOtp({otp,phone:dataFromStore.phone,hash:dataFromStore.hash});
      console.log(res.data);
      dispatch(setAuth(res.data));
      }
      // onNext();
    }catch(err){
      console.log(err);
    }
  }
  // const hash=dataFromStore.hash;
  // const exp=hash.split('.')[1];
  return (
    <>
    <div className={Style.cardWrapper}>
    <Card title="Enter Your code just recently sent" icon="lock-emoji">
      <div className={Style.resend} onClick={resendOtp}>resend</div>
      <TextInput value={otp} type="number" onChange={(e) => setInputOtp(e.target.value)} />
      <div>
        <div className={Style.actionbtnWrap}>
          <Button text="Next" logo="arrow-forward" onclick={handleSubmit}/>
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