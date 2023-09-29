const express=require("express");
const UserRouter=express.Router();
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const { Usermodel}=require("../Models/User.model");

UserRouter.post("/api/register",async(req,res)=>{
    try {
        let {name,email,password,address}=req.body;
        let CheckEmail=await Usermodel.find({email});
        console.log(CheckEmail);
        // console.log(req.body);
        if(CheckEmail.length>0){
            res.status(402).send({"msg":"alreday registered"});
        }else{
            bcrypt.hash(password,5,async(err,hash)=>{
                if(err){
                    res.status(501).send({"msg":"error in hashing"})
                }else{
                    let stroedData=new Usermodel({name,email,password:hash,address});
                    await stroedData.save();
                    res.status(201).send({"msg":"registered successfully"})                   
                }
            })
        }
    } catch (error) {
        console.log(error);
        res.status(501).send({"msg":error})
    }
});

UserRouter.post("/api/login",async(req,res)=>{
    try {
        let {email,password}=req.body;
        let CheckEmail=await Usermodel.find({email});
        if(CheckEmail.length==0){
            res.status("402").send({"msg":"go for registration"});
        }else{
            bcrypt.compare(password,CheckEmail[0].password,async(err,result)=>{
                if(err){
                    res.status(501).send({"msg":"error in comparing the password"})
                }else{
                   let token=jwt.sign({userid:CheckEmail[0]._id,adress:CheckEmail[0].address},process.env.Secret);
                   console.log(token);
                   res.status(201).send({"msg":"successfully log in",token})
                }
            })
        }
    } catch (error) {
        console.log(error);
        res.status(501).send({"msg":error})
    }
});

UserRouter.patch("/api/user/:id/reset",async(req,res)=>{
    try {
        let {oldPass,newPass}=req.body;
        let id=req.params.id;
        let user=await Usermodel.find({_id:id});
        if(user.length==0){
            res.status(402).send({"msg":"Invalid user did not match id"})
        }else{
            console.log(user);
            bcrypt.compare(oldPass,user[0].password,async(err,result)=>{
                if(result){
                    let user=await Usermodel.findByIdAndUpdate({_id:id},{password:newPass});
                    console.log(user);
                    res.status(204).send({"msg":"password has been reset"})
                }else{
            res.status(402).send({"msg":"Invalid old password "})
                }
            })
        }
    } catch (error) {
        console.log(error);
        res.status(501).send({"msg":error})
    }
});

module.exports={
    UserRouter
}