import React, { useState } from 'react'
import Card from '../../../components/shared/Card/Card'
import Button from '../../../components/shared/Button/Button'
import Style from './Profile.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setAvatar } from '../../../store/activateSlice'
import {activate} from '../../../http/index'
import { setAuth } from '../../../store/authSlice'
import Loader from '../../../components/shared/Loader/Loader'

const Profile = ({ onNext }) => {
  const dispatch = useDispatch();
  const { name,avatar } = useSelector((state) => state.activate)
  const [image, setImage] = useState('/images/monkey-avatar.png')
  const [loading,setLoading]=useState(false);
  // const [unMount,setUnMount] = useState(false);

  function captureImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      // console.log(reader.result);
      setImage(reader.result);
      dispatch(setAvatar(reader.result))
    }
    // console.log(e.target.files[0].name);
  }
  async function handleSubmit() { 
    setLoading(true);
    try{
      const {data}=await activate({name,avatar})
      // console.log(data);
      if(data.auth){
        dispatch(setAuth(data))
        }
      
    }catch(err){
      console.log(err);
    }finally{
    setLoading(false);
    }
  }

  if(loading) return <Loader message="Activation in progress..."/>
  return (
    <>
      <div className={Style.cardWrapper}>
        <Card title={`Okay, ${name}`} icon="monkey-emoji">
          <p className={Style.subHeading}>How's this photo?</p>
          <div className={Style.avatarWrapper}>
            <img className={Style.avatarImage} src={image} alt='avatar' />
          </div>
          <div>
            <input onChange={captureImage} id='avatarInput' type='file' className={Style.avatarInput} />
            <label className={Style.avatarLabel} htmlFor="avatarInput">Choose a different photo</label>
          </div>
          <div className={Style.actionbtnWrap}>
            <Button text="Next" logo="arrow-forward" onclick={handleSubmit} />
          </div>
        </Card>
      </div>
    </>
  )
}

export default Profile