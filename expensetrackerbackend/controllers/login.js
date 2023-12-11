const express=require('express');
const router=express.Router();
const {User}=require("../models/UserSchema")
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const uuid=require('uuid');
router.use(express.json())
router.get('/',(req,res)=>{
    res.send("Hi hit the home route");
})
router.post('/login',async(req,res)=>{
    try{
    const u=req.body;
    console.log(req.body);
    if(req.body===undefined){

        res.status(400).json({"msg":"Something went wrong"})
    }
    const foundUsers = await User.findOne({ "email": req.body.email});
   // console.log(foundUsers);
    if(foundUsers===null){
        res.status(401).json({"msg":"Invalid username.Please Signup"})
        return;
    }
    else{
        const enteredpass=req.body.password;
        var result=await bcrypt.compare(enteredpass,foundUsers.password);
       // print(res);
        if(result){
            res.status(201).json({"msg":foundUsers.user_id});
        }
    }
    res.status(401).json({"msg":"invalid credentials"})
    }catch(e){
       // res.json({"msg":"something went wrong"}).status(500)
       console.log(e);
    }
})
router.post('/signup',async(req,res)=>{
    try{
    const email=req.body.email;
    const password=req.body.password;
    const uuid1=uuid.v4();
    if(email==null||password==null){
        res.status(400).json({"msg":"something went wrong from your side"});
    }
    const foundUsers=await User.findOne({email:req.body.email});
    if(foundUsers!=null){
        res.status(401).json({"msg":"User account already exists"});
    }
    const u=new User();
    u.email=email;
    u.password=await bcrypt.hash(req.body.password,10);
    u.user_id=uuid1;
    await u.save();
    res.status(201).json({"msg":"user created successfully"})
    }catch(e){
        console.log(e);
        res.status(500).json({"msg":"something went wrong"})
    }

})
router.put('/budget/:id',async (req,res)=>{
    const id=req.params.id;
    const budget=req.body.budget;
    if(id===null){
        res.status(401).json({"msg":"unauthorised"});
    }
    const u=await User.findOne({user_id:id});
    if(u==null){
        res.status(401).json({"msg":"invalid user"})
    }
    u.budget=Number(budget);
    u.balance=u.budget;
    await u.save();
   
    res.status(201).json({"msg":"budget and balance set successfully"});
})

module.exports.userRoute=router;