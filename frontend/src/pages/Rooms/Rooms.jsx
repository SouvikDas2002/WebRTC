import React, { useEffect, useState } from 'react'
import styles from './rooms.module.css'
import RoomCard from '../../components/RoomCard/RoomCard';
import RoomModal from '../../components/RoomModal/RoomModal';
import { getAllRooms } from '../../http';


// const rooms = [
//   {
//     id: 1,
//     topic: 'Which framework best for frontend ?',
//     speakers: [
//       {
//         id: 1,
//         name: 'John Doe',
//         avatar: '/images/monkey-avatar.png',
//       },
//       {
//         id: 2,
//         name: 'Jane Doe',
//         avatar: '/images/monkey-avatar.png',
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 3,
//     topic: 'What’s new in machine learning?',
//     speakers: [
//       {
//         id: 1,
//         name: 'John Doe',
//         avatar: '/images/monkey-avatar.png',
//       },
//       {
//         id: 2,
//         name: 'Jane Doe',
//         avatar: '/images/monkey-avatar.png',
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 4,
//     topic: 'Why people use stack overflow?',
//     speakers: [
//       {
//         id: 1,
//         name: 'John Doe',
//         avatar: '/images/monkey-avatar.png',
//       },
//       {
//         id: 2,
//         name: 'Jane Doe',
//         avatar: '/images/monkey-avatar.png',
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 5,
//     topic: 'Artificial inteligence is the future?',
//     speakers: [
//       {
//         id: 1,
//         name: 'John Doe',
//         avatar: '/images/monkey-avatar.png',
//       },
//       {
//         id: 2,
//         name: 'Jane Doe',
//         avatar: '/images/monkey-avatar.png',
//       },
//     ],
//     totalPeople: 40,
//   },
// ];

const Rooms = () => {
  const [showModal, setShowModal] = useState(false)
  const [rooms,setRooms]=useState([]);

  useEffect(()=>{
    const fetchRooms=async()=>{
      const {data} = await getAllRooms();
      setRooms(data);
    }
    fetchRooms();
  },[])

  function addRoom() {
    setShowModal(!showModal);
  }
  return (
    <>
      <div className='container'>
        <div className={styles.header}>
          <div className={styles.left}>
            <span className={styles.heading}>All voice rooms</span>
            <div className={styles.searchBox}>
              <input type="text" className={styles.search} />
            </div>
          </div>
          <div className={styles.right}>
            <button className={styles.startRoom}onClick={addRoom}>
              <span >Start a room</span>
            </button>
          </div>
        </div>

        <div className={styles.roomList}>
          {rooms.map(room => (
            <RoomCard key={room.id} rooms={room} />
          ))}
        </div>
        {showModal && <RoomModal onClose={addRoom}/>}
      </div>
    </>
  )
}

export default Rooms