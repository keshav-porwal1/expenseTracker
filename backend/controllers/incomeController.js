import mongoose from "mongoose";
import Income from "../models/income.js";

async function createIncome(req,res){
    const {userId,amount,source,description,date}=req.body;
    const income=new Income({
        userId,
        amount,
        source,
        description,
        date
    });
    await income.save();
    res.status(201).json({message: "Income Created Successfully",income});
};

async function getIncomeById(req,res){
    const id=req.params.id.trim();
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message : "Invalid Income Id"});
    }
    const income=await Income.findById(id);
    if(!income){
        res.status(404).json({message: "Income Not Found"});
    }
    else{
        res.status(200).json(income);
    }
};

async function getIncomes(req,res){
    const userId=req.params.userId.trim();
    const incomes= await Income.find({userId});
    if(!incomes || incomes.length===0){
        res.status(404).json({message: "Incomes Not Found"});
    }
    else{
        res.status(200).json(incomes);
    }
};

async function updateIncome(req,res){
    const {userId,amount,source,description,date}=req.body;
    const id=req.params.id.trim();
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message: "Invalid Income Id"});
    }
    const income=await Income.findById(id);
    if(!income){
        res.status(404).json({message: "Income Not Found"});
    }
    else{
        income.userId=userId;
        income.amount=amount;
        income.source=source;
        income.description=description;
        income.date=date;
        await income.save();
        res.status(200).json({message: "Income Updated Successfully"});
    }
};

async function deleteIncome(req,res){
    const id=req.params.id.trim();
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message: "Invalid Income Id"});
    }
    const income=await Income.findByIdAndDelete(id);
    if(!income){
        res.status(404).json({message: "Income Not Found"});
    }
    else{
        res.status(200).json({message : "Income Deleted Successfully"});
    }
};

export {createIncome,getIncomeById,getIncomes,updateIncome,deleteIncome};