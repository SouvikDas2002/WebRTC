import React from 'react'
import Button from '../../../../components/shared/Button/Button'
// import styles from '../Identity.module.css'
import Card from '../../../../components/shared/Card/Card'

const Phone = () => {
  return (
    <Card title="Enter Your Phone Number" icon="phone">
        <div>
          <Button text="Next" logo="arrow-forward"/>
        </div>
      </Card>
  )
}

export default Phone