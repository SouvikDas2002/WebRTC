import React from 'react'
import styles from './RoomCard.module.css'
import { useNavigate } from 'react-router-dom'

const RoomCard = ({rooms}) => {
  const navigate=useNavigate();
  return (
    <div onClick={()=>{navigate(`/room/${rooms.id}`)}} className={styles.card}>
      <h3 className={styles.topic}>{rooms.topic}</h3>
      <div className={`${styles.speakers} ${rooms.speakers.length===1?styles.singleSpeaker:''}`}>
      <div className={styles.avatars}>
        {rooms.speakers.map(speaker=>(
          <img key={speaker.id} src={speaker.avatar} alt="speaker"/>
        ))}
      <div className={styles.names}>
      {rooms.speakers.map(speaker=>(
          <div key={speaker.id} className={styles.nameWrapper}>
            <span>{speaker.name}</span>
          </div>
        ))}
      </div>
      </div>
      </div>
      <div className={styles.peopleCount}>
        <span>Members: {rooms.totalPeople}</span>
      </div>
    </div>
  )
}

export default RoomCard