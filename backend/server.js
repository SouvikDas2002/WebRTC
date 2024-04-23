const express=require('express')
const app=express();
require('dotenv').config();
const PORT=process.env.PORT || 5000;
const DB=require('./mongo/connection');
DB()
const otpRoute=require('./routes');
const cors=require('cors')
const cookieParser=require('cookie-parser');
const ACTIONS = require('./action');
const server=require('http').createServer(app);

const io=require('socket.io')(server,{
    cors:{
        origin:['http://localhost:3000'],
        methods:['GET','POST']
    }
});

app.use(cookieParser())

const corsOption={
    credentials:true,
    origin:['http://localhost:3000']
}
app.use(cors(corsOption))
app.use('/storage',express.static('storage'))
app.use(express.json({limit:'50mb'}))
app.use(otpRoute);

app.get('/',(req,res)=>{
    res.send("hello");
})


//Sockets

const socketUserMapping={}

io.on('connection',(socket)=>{
    console.log('new connection',socket.id);

    socket.on(ACTIONS.JOIN,({roomId,user})=>{
        socketUserMapping[socket.id]=user;
        // new map
        const clients=Array.from(io.sockets.adapter.rooms.get(roomId) || [])

        clients.forEach(clientId=>{
            io.to(clientId).emit(ACTIONS.ADD_PEER,{
                peerId:socket.id,
                createOffer:false,
                user
            });
            socket.emit(ACTIONS.ADD_PEER,{
                peerId:clientId,
                createOffer:true,
                user:socketUserMapping[clientId]
            });
        }) 

        socket.join(roomId);
    })
    // handle relay ice
    socket.on(ACTIONS.RELAY_ICE,({peerId,icecandidate})=>{
        io.to(peerId).emit(ACTIONS.ICE_CANDIDATE,{
            peerId:socket.id,
            icecandidate
        })
    })
    // handle relay sdp(session descriptor)
    socket.on(ACTIONS.RELAY_SDP,({peerId,sessionDescription})=>{
        io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION,{
            peerId:socket.id,
            sessionDescription
        })
    })
    //LEaving the room
    const leaveRoom=()=>{
        const {rooms}=socket;
        Array.from(rooms).forEach(roomId=>{
            const clients=Array.from(io.sockets.adapter.rooms.get(roomId) || [])
            // console.log(socket.id);
            clients.forEach(clientId=>{
                io.to(clientId).emit(ACTIONS.REMOVE_PEER,{
                    peerId:socket.id,
                    userId:socketUserMapping[socket.id]?.id,
                })
                socket.emit(ACTIONS.REMOVE_PEER,{
                    peerId:clientId,
                    userId:socketUserMapping[clientId]?.id,
                });
            })
            socket.leave(roomId)
        })
        delete socketUserMapping[socket.id];
    }
    socket.on(ACTIONS.LEAVE,leaveRoom);
    socket.on('disconnecting',leaveRoom);
})

server.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
})