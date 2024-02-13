import React from 'react'
import Card from '../../components/shared/Card/Card'
import styles from './Home.module.css'
import {Link} from 'react-router-dom'
import Button from '../../components/shared/Button/Button'

function Home() {
  const signin={
    color:'#0077ff',
    fontWeight:'bold',
    textDecoration:'none',
    marginLeft:'10px'
  }
  return (
    <div className={styles.wrapper}>
      <Card title="Welcome to Dev-House!!!" icon="logo">
        <p className={styles.text}>I am working hard to get this house ready for You .
          While I wrap up the finishing touches, I am adding people
          gradulally to make sure nothing breaks.</p>
        <div>
          <Button text="Get your username" logo="arrow-forward"/>
        </div>
        <div className={styles.signin}>
          <span className={styles.invite}>Have an invite text?</span>
          <Link to='/login' style={signin}>Sign in</Link>
        </div>
      </Card>
    </div>
  )
}

export default Home
