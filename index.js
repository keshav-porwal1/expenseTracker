import express from "express";
import cors from "cors";
import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
import {registerUser,loginUser,getUser} from "./controllers/userController.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT=3000;

app.use(cors());
app.use(express.json());

app.use("/api/users",userRoutes);

const MONGO_URL=process.env.MONGO_URL;

async function startServer(){
    try{
        await mongoose.connect(MONGO_URL);
        console.log("Connected to database");

        app.listen(PORT,()=>{
            console.log(`Server is listening on port ${PORT}`);
        })
    }
    catch(error){
        console.log("Error connecting to database:",error);
    }
}
startServer();





