import React, { useState } from 'react'
import Button from '../../../../components/shared/Button/Button'
import Card from '../../../../components/shared/Card/Card'
import TextInput from '../../../../components/shared/TextInput/TextInput'
import Style from '../Identity.module.css'

const Phone = ({onNext}) => {
  const [number, setNumber] = useState("");
  return (
    <Card title="Enter Your Phone Number" icon="phone">
      <TextInput type="number" value={number} onChange={(e) => setNumber(e.target.value)} />
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
  )
}

export default Phone