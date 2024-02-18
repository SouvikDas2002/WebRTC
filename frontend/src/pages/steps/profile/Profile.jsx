import React, { useState } from 'react'
import Card from '../../../components/shared/Card/Card'
import Button from '../../../components/shared/Button/Button'
import Style from './Profile.module.css'
import { useSelector } from 'react-redux'

const Profile = ({onNext}) => {
  const{name}=useSelector((state)=>state.activate)
  const [image,setImage]=useState('/images/monkey-avatar.png')
  function handleSubmit(){}
  return (
    <>
     <div className={Style.cardWrapper}>
     <Card title={`Okay, ${name}`} icon="monkey-emoji">
      <p className={Style.subHeading}>How's this photo?</p>
      <div className={Style.avatarWrapper}>
        <img className={Style.avatarImage} src={image} alt='avatar'/>
      </div>
      <div>
        <input id='avatarInput' type='file' className={Style.avatarInput}/>
        <label className={Style.avatarLabel} for="avatarInput">Choose a different photo</label>
        </div>
        <div className={Style.actionbtnWrap}>
          <Button text="Next" logo="arrow-forward" onclick={handleSubmit}/>
        </div>
    </Card>
    </div>
    </>
  )
}

export default Profile