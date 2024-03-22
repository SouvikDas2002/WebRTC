import React from 'react'
import styles from './RoomCard.module.css'

const RoomCard = ({rooms}) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.topic}>{rooms.topic}</h3>
      <div className={styles.speakers}>
      <div className={styles.avatars}>
        {rooms.speakers.map(speaker=>(
          <img src={speaker.avatar} alt="speaker"/>
        ))}
      </div>
      <div className={styles.names}>
      {rooms.speakers.map(speaker=>(
          <div className={styles.nameWrapper}>
            <span>{speaker.name}</span>
          </div>
        ))}
      </div>
      </div>
      <div className={styles.peopleCount}>
        <span>Members: {rooms.totalPeople}</span>
      </div>
    </div>
  )
}

export default RoomCard