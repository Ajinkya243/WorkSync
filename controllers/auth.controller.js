require('dotenv').config();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const{User}=require("../models/User.models");
const jwt_key=process.env.jwt_key;
const loginUser=async(req,resp)=>{
    try{
        const{email,password}=req.body
        const existingUser=await User.findOne({email});
        if(existingUser){
        const isMatch=await bcrypt.compare(password,existingUser.password);
        if(!isMatch){
            return resp.status(404).json({"message":"Password not match"});
        }
        const token=jwt.sign({...existingUser},jwt_key,{"expiresIn":"24h"})
        resp.status(200).json({message: "Login successful",token,
        user:{
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
    });
        }
        else{
            return resp.status(404).json({"message":"Invalid Credentials"})
        }
    }
    catch(error){
        resp.status(500).json({"message":"Something went wrong"})
    }
}

const getUserDetails=async(req,resp)=>{
    try{
        const{id}=req.user;
        const  userData=await User.findById(id);
        if (!userData) {
            return resp.status(404).json({ message: "User not found" });
        }
        resp.status(200).json(userData);
        
    }
    catch(error){
        resp.status(500).json({"message":"Something went wrong"})
    }
}


module.exports={loginUser,getUserDetails};