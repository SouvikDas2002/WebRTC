const express=require('express')
const app=express();
require('dotenv').config();
const PORT=process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send("hello");
})


app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
})