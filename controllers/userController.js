import User from "../models/user.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY;

async function registerUser(req,res){
    const {name,email,password}=req.body;
    const existingUser=await User.findOne({email});
    if(existingUser){
        return res.status(400).json({message: "User already exists"});
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const user=new User({
        name,
        email,
        password: hashedPassword
    });
    await user.save();
    res.status(201).json({message:"User Registered Successfully"});
};


async function loginUser(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // Sign JWT
    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
    );

    res.status(200).json({
        message: "Login successful",
        token,
        userId: user._id
    });
}


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