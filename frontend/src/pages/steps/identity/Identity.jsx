import React, { useState } from 'react'
import Phone from './Phone/Phone';
import Email from './Email/Email';
import styles from './Identity.module.css'

const phoneEmail = {
  phone: Phone,
  email: Email
}
function Identity({ onNext }) {
  const [type, setType] = useState('phone');
  const Comp = phoneEmail[type];

  return (
    <>
      <div className={styles.cardWrapper}>
        <div>
          <div className={styles.btnWrap}>
            <button className={`${styles.tabbutton} ${type === 'phone' ? styles.active : ''}`} onClick={() => setType('phone')}><img src='/images/phone.png' alt='phone' /></button>
            <button className={`${styles.tabbutton} ${type === 'email' ? styles.active : ''}`} onClick={() => setType('email')}><img src='/images/phone.png' alt='email' /></button>

          </div>
          <Comp onNext={onNext} />
        </div>
      </div>
    </>
  )
}

export default Identity