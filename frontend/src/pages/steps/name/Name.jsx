import React, { useState } from 'react'
import Card from '../../../components/shared/Card/Card'
import TextInput from '../../../components/shared/TextInput/TextInput'
import Button from '../../../components/shared/Button/Button'
import Style from './Name.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../../../store/activateSlice'

const Name = ({ onNext }) => {
  const { name } = useSelector((state) => state.activate)
  const [fullname, setFullname] = useState(name);
  const dispatch = useDispatch()
  
  function handleSubmit() {
    if (!fullname)
      return
    dispatch(setName(fullname))
    onNext();
  }
  return (
    <>
      <div className={Style.cardWrapper}>
        <Card title="What's your full name?" icon="goggle-emoji">
          <TextInput value={fullname} type="text" onChange={(e) => setFullname(e.target.value)} />
          <div>
            <div className={Style.actionbtnWrap}>
              <Button text="Next" logo="arrow-forward" onclick={handleSubmit} />
            </div>
            <p className={Style.bottompara}>
              People use their real name at Dev-House :) !
            </p>
          </div>
        </Card>
      </div>
    </>
  )
}

export default Name