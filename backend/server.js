const express=require('express')
const app=express();
require('dotenv').config();
const PORT=process.env.PORT || 5000;
const DB=require('./mongo/connection');
DB()
const otpRoute=require('./routes');
const cors=require('cors')
const cookieParser=require('cookie-parser');
const { METHODS } = require('http');
const ACTIONS = require('./action');
const server=require('http').createServer(app);

const io=require('socket.io')(server,{
    cors:{
        origin:['http://localhost:3000'],
        METHODS:['GET','POST']
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

const socketUserMapping={

}

io.on('connection',(socket)=>{
    console.log('new connection',socket.id);

    socket.on(ACTIONS.JOIN,({roomId,user})=>{
        socketUserMapping[socket.id]=user;
        // new map
        const clients=Array.from(io.sockets.adapter.rooms.get(roomId) || [])

        clients.forEach(clientId=>{
            io.to(clientId).emit(ACTIONS.ADD_PEER,{});
        })
        socket.emit(ACTIONS.ADD_PEER);

        socket.join(roomId);
    })

})

server.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
})