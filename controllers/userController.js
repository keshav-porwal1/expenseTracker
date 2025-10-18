import User from "../models/user.js";
import mongoose from "mongoose";


async function registerUser(req,res){
    const {name,email,password}=req.body;
    const user=new User({
        name,
        email,
        password,
    });
    await user.save();
    res.status(201).json({message:"User Registered Successfully"});
};

async function loginUser(req,res){
    const {email,password}=req.body;
    const user=await User.findOne({
        email,
    });
    if(!user){
        res.status(401).json({message:"Invalid credentials"});
    }
    else if(user.password!=password){
        res.status(401).json({message:"Invalid credentials"});
    }
    else{
        res.status(200).json({message:"Login successful"});
    }
};

async function getUser(req,res){
    const id=req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({ message: "Invalid user ID" });
    }
    const user=await User.findById(id);
    if(!user){
        res.status(404).json({message:"User Not Found"});
    }
    else{
        res.status(200).json(user);
    }
};

export {registerUser,loginUser,getUser};