const express=require('express')
const app=express();
require('dotenv').config();
const PORT=process.env.PORT || 5000;
const DB=require('./mongo/connection');
DB()
const otpRoute=require('./routes');
const cors=require('cors')

const corsOption={
    credentials:true,
    origin:['http://localhost:3000']
}
app.use(cors(corsOption))
app.use(express.json())
app.use(otpRoute);

app.get('/',(req,res)=>{
    res.send("hello");
})
app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
})