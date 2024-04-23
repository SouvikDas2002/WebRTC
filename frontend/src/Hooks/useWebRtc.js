import { useCallback, useEffect, useRef} from "react";
import { useStateWithCallback } from "./useStateWithCallback";
import {socketInit} from "../socket";
import { ACTIONS } from "../action";
import freeice from 'freeice';



export const useWebRtc = (roomId, user) => {
  const [clients, setClients] = useStateWithCallback([]);
  const audioElements = useRef({});
  const connections = useRef({});
  const localMediaStream = useRef(null);
  const socket=useRef(null);

  useEffect(()=>{
    socket.current=socketInit();
  },[]);

  const addNewClient = useCallback(
    (newClient, cb) => {
      const lookingFor = clients.find((client) => client.id === newClient.id);
      if (lookingFor === undefined) {
        setClients((exist) => [...exist, newClient], cb);
      }
    },
    [clients, setClients]
  );
  //   capture media
  useEffect(() => {
    const startCapture = async () => {
      localMediaStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    };
    startCapture().then(() => {
      // if(localMediaStream.current){
      addNewClient(user, () => {
        const localElement = audioElements.current[user.id];
        if (localElement) {
          localElement.volume = 0;
          localElement.srcObject = localMediaStream.current;
        }

        // socket emit join socket io
        socket.current.emit(ACTIONS.JOIN,{roomId,user});
      });
    // }
    });

    return ()=>{
      // leaving room
      if(localMediaStream.current){
      localMediaStream.current.getTracks().forEach(track => 
        track.stop())
      }
      socket.current.emit(ACTIONS.LEAVE,{roomId});
    }
  }, []);

  useEffect(()=>{
    const handleNewPeer = async({peerId,createOffer,user:remoteUser}) => {
      if(peerId in connections.current){
        return console.warn(`You are already connected with ${peerId} (${user.name}) `)
      }
      connections.current[peerId] = new RTCPeerConnection({
        iceServers:freeice()
      })
      // handle new ice candidate
      connections.current[peerId].onicecandidate=(e)=>{
        socket.current.emit(ACTIONS.RELAY_ICE,{
          peerId,icecandidate:e.candidate
        })
      }
      // Handle ontrack on this connection
      connections.current[peerId].ontrack=({
        streams:[remoteStream]
      })=>{
        addNewClient(remoteUser,()=>{
          if(audioElements.current[remoteUser.id]){
            audioElements.current[remoteUser.id].srcObject=remoteStream;
          }else{
            let settled=false;
            const interval=setInterval(()=>{
              if(audioElements.current[remoteUser.id]){
                audioElements.current[remoteUser.id].srcObject=remoteStream;
                settled=true;
              }
              if(settled){
                clearInterval(interval);
              }
            },1000)
          }
        })
      }
      // add local track to remote connections
      localMediaStream.current.getTracks().forEach(t=>{
        connections.current[peerId].addTrack(t,localMediaStream.current);
      })
      // create offer
      if(createOffer){
        const offer=await connections.current[peerId].createOffer()

        await connections.current[peerId].setLocalDescription(offer);

        // send offer to another client
        socket.current.emit(ACTIONS.RELAY_SDP,{
          peerId,
          sessionDescription:offer
        })
      }
    }
    socket.current.on(ACTIONS.ADD_PEER,handleNewPeer)
    return()=>{
      socket.current.off(ACTIONS.ADD_PEER)
    }
  },[])

  // handle ice candidate
  useEffect(()=>{
    socket.current.on(ACTIONS.ICE_CANDIDATE,({peerId,icecandidate})=>{
      if(icecandidate){
        connections.current[peerId].addIceCandidate(icecandidate);
      }
    })
    return()=>{
      socket.current.off(ACTIONS.ICE_CANDIDATE);  
    }
  },[]);

  // handle sdp
  useEffect(()=>{
    const handleRemoteSdp=async({peerId,sessionDescription:remoteSessionDesc})=>{
      connections.current[peerId].setRemoteDescription(
        new RTCSessionDescription(remoteSessionDesc)
      )
      // if session description is type of offer then create an answer
      if(remoteSessionDesc.type==='offer'){
        const connection=connections.current[peerId];
        const answer=await connection.createAnswer();

        connection.setLocalDescription(answer);

        socket.current.emit(ACTIONS.RELAY_SDP,{
          peerId,
          sessionDescription:answer
        })
      }
    }
    socket.current.on(ACTIONS.SESSION_DESCRIPTION,handleRemoteSdp)

    return ()=>{
      socket.current.off(ACTIONS.SESSION_DESCRIPTION)
    }
  },[])

  // handle remove peer
  useEffect(()=>{
    const handleRemovePeer=async({peerId,userId})=>{
      if(connections.current[peerId]){
        connections.current[peerId].close();
      }
      delete connections.current[peerId];
      delete audioElements.current[peerId];
      setClients(list=>list.filter(client=>client.id!==userId))
    }
    socket.current.on(ACTIONS.REMOVE_PEER,handleRemovePeer);
    return ()=>{
      socket.current.off(ACTIONS.REMOVE_PEER)
    }
  },[])
  const provideRef = (instance, userId) => {
    audioElements.current[userId] = instance;
  };
  return { clients, provideRef };
};
