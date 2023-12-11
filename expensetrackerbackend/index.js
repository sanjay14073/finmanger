const express=require('express');
const mongoose=require('mongoose');
const userRoute=require('./controllers/login');
const app=express();
const mongouri="mongodb://localhost:27017/expense"
const db=mongoose.connect(mongouri).then(()=>{console.log("connected to database successfully")});
app.use('/',userRoute.userRoute);
app.listen(3000,()=>{
console.log('server started at port 3000');
})