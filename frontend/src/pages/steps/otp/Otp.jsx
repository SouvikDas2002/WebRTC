import React, { useState } from 'react'
import Card from '../../../components/shared/Card/Card'
import Style from './Otp.module.css'
import Button from '../../../components/shared/Button/Button'
import TextInput from '../../../components/shared/TextInput/TextInput'
import { verifyOtp } from '../../../http'
import { useSelector } from 'react-redux' //fetch data from our redux store
import {setAuth} from '../../../store/authSlice'
import { useDispatch } from 'react-redux'

const Otp = ({onNext}) => {
  const [otp,setOtp]=useState('')
  const dispatch=useDispatch();
  const dataFromStore=useSelector((state)=>state.auth.otp) //dataFromStore or {phone,hash} retrive this value from slice
  // console.log(dataFromStore);

  async function handleSubmit(){
    try{
      const res=await verifyOtp({otp,phone:dataFromStore.phone,hash:dataFromStore.hash});
      console.log(res.data);
      dispatch(setAuth(res.data));
      // onNext();
    }catch(err){
      console.log(err);
    }
  }
  return (
    <>
    <div className={Style.cardWrapper}>
    <Card title="Enter Your code just recently sent" icon="lock-emoji">
      <TextInput value={otp} type="number" onChange={(e) => setOtp(e.target.value)} />
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