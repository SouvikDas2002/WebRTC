import React from 'react'
import styles from './Button.module.css'

function Button({text,logo}) {
  return (
    <button className={styles.btn}>
      <span>{text}</span>
      <img className={styles.arrow} src={`/images/${logo}.png`} alt=''/>
    </button>
  )
}

export default Button
