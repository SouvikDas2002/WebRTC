import React, { useState } from 'react'
import Card from '../../../../components/shared/Card/Card'
import Button from '../../../../components/shared/Button/Button'
import TextInput from '../../../../components/shared/TextInput/TextInput'
import Style from '../Identity.module.css'

const Email = () => {
  const [email, setEmail] = useState("");
  return (
    <Card title="Enter Your Email" icon="email-emoji">
      <TextInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <div>

        <div className={Style.actionbtnWrap}>
          <Button text="Next" logo="arrow-forward" />
        </div>
        <p className={Style.bottompara}>
          By entering your number, you’re agreeing to our
          Terms of Service and Privacy Policy. Thanks!
        </p>
      </div>
    </Card>
  )
}

export default Email