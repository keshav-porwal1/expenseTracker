import express from "express";
import cors from "cors";
import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.js";

dotenv.config();

const app = express();
const PORT=3000;

app.use(cors());
app.use(express.json());

app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
});

const MONGO_URL=process.env.MONGO_URL;

async function connectToDatabase(){
    try{
        await mongoose.connect(MONGO_URL);
        console.log("Connected to database");
    }
    catch(error){
        console.log("Error connecting to database:",error);
    }
}
connectToDatabase();
(async()=>{
    const newUser=new User({
    name:"Keshav",
    email:"keshavporwal@gmail.com",
    password:"keshav123",
});
await newUser.save();
})();


