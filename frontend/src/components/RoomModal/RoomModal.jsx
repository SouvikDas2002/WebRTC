import React from 'react'
import styles from './RoomModal.module.css'
import TextInput from '../shared/TextInput/TextInput'
import { useState } from 'react'
import { createRoom as create } from '../../http'

const RoomModal = ({ onClose }) => {
  const [roomType,setRoomType]=useState("Open to everyone 🪄");
  const [topic,setTopic]=useState("");

  async function createRoom(){
    try{
      if(!topic) return;
      const {data}=await create({topic,roomType});
      console.log(data);
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalBody}>
        <div className={styles.close}>
          <span onClick={onClose}>Close</span>
        </div>
        <div className={styles.modalHeader}>
          <h3>Enter the topic to be discussed</h3>
          <TextInput fullwidth="true" value={topic} onChange={(e)=>setTopic(e.target.value)}/>
          <h2 style={{color:'#0077ff'}}>Room types</h2>
          <div className={styles.roomTypes}>
            <div className={`${styles.typeBox} ${roomType==="Open to everyone 🪄"?styles.active:''}`} onClick={()=>setRoomType("Open to everyone 🪄")}>
              <span>GLOBAL</span>
            </div>
            <div className={`${styles.typeBox} ${roomType==="Social Network 😎"?styles.active:''}`} onClick={()=>setRoomType("Social Network 😎")}>
              <span>SOCIAL</span>
            </div>
            <div className={`${styles.typeBox} ${roomType==="Private Network 🔒"?styles.active:''}`} onClick={()=>setRoomType("Private Network 🔒")}>
              <span>PRIVATE</span>
            </div>
          </div>
        </div>
        <hr/>
        <div className={styles.modalFooter}>
          <span>Start a room, "{roomType}"</span>
          <button onClick={createRoom}>🎉 Let's Go</button>
        </div>
      </div>
    </div>
  )
}

export default RoomModal