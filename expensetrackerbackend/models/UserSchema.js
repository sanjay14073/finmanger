const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const { Transastions } = require('./TransastionSchema');
const user=new mongoose.Schema({
    "user_id":{
        type:String,
    },
    "email":{
        required:true,
        type:String,
    },
    "password":{
        required:true,
        type:String,
    },
    "budget":{
        type:Number,
    },
    "transastions":{
        type:[Transastions]
    },
    "balance":{
        
        type:Number,        
    },
})
const User=mongoose.model("User",user);
module.exports={User};
