import Expense from "../models/expense.js";
import mongoose from "mongoose";

async function createExpense(req,res){
    const {userId,amount,category,description,date}=req.body;
    const expense=new Expense({
        userId,
        amount,
        category,
        description,
        date,
    });
    await expense.save();
    res.status(201).json({message:"Expense Created Successfully",expense});
};

async function getExpenseById(req,res){
    const id=req.params.id.trim();
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message: "Invalid expense Id"});
    }
    const expense=await Expense.findById(id);
    if(!expense){
        res.status(404).json({message:"Expense Not Found"});
    }
    else{
        res.status(200).json(expense);
    }
}

async function getExpenses(req,res){
    const userId=req.params.userId.trim();
    const expenses=await Expense.find({userId});
    if(!expenses || expenses.length===0){
        res.status(404).json({message:"Expenses Not Found"});
    }
    else{
        res.status(200).json(expenses);
    }
};

async function updateExpense(req,res){
    const {userId,amount,category,description,date}=req.body;
    const id=req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message: "Invalid expense Id"});
    }
    const expense=await Expense.findById(id);
    if(!expense){
        res.status(404).json({message:"Expense Not Found"});
    }
    else{
        expense.userId=userId;
        expense.amount=amount;
        expense.category=category;
        expense.description=description;
        expense.date=date;
        await expense.save();
        res.status(200).json({message:"Expense Updated Successfully"});
    }
};

async function deleteExpense(req,res){
    const id=req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json("Invalid expense id");
    }
    const expense=await Expense.findByIdAndDelete(id);
    if(!expense){
        res.status(404).json({message:"Expense Not Found"});
    }
    else{
        res.status(200).json({message:"Expense Deleted Successfully"});
    }
}

export {createExpense,getExpenseById,getExpenses,updateExpense,deleteExpense};