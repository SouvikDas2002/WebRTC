import React from 'react'
import { useWebRtc } from '../../Hooks/useWebRtc'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux';

const Room = () => {
  // console.log(useWebRtc())
  const {id:roomId} = useParams();
  const user=useSelector((state)=>state.auth.user)
  const {clients,provideRef}=useWebRtc(roomId,user);
// console.log(clients);
  return (
    <div>
      <h1>All connected clients</h1>
      {
        clients.map((client)=>{
          return <div key={client.id}>
            <audio ref={(instance)=>provideRef(instance,client.id)} controls autoPlay></audio>
            <h4>{client.name}</h4>
            </div>
        })
      }
      </div>
  )
}

export default Room