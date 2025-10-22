import express from "express";
import cors from "cors";
import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js"
import notificationRoutes from "./routes/notificationRoutes.js"

dotenv.config();

const app = express();
const PORT=3000;

app.use(cors());
app.use(express.json());

app.use("/api/users",userRoutes);
app.use("/api/expenses",expenseRoutes);
app.use("/api/incomes",incomeRoutes);
app.use("/api/budgets",budgetRoutes);
app.use("/api/notifications",notificationRoutes);

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





