import mongoose from "mongoose";
import Budget from "../models/budget.js";
import Expense from "../models/expense.js";


async function createBudget(req,res){
    const {userId,category,limitAmount,startDate,endDate}=req.body;
    const budget=new Budget({
        userId,
        category,
        limitAmount,
        startDate,
        endDate,
    });
    await budget.save();
    res.status(201).json({message: "Budget Created Successfully."})
};

async function getActiveBudget(req,res){
    const userId=req.params.userId;
    if(!mongoose.Types.ObjectId.isValid(userId)){
        return res.status(400).json({message: "Invalid User Id"});
    }
    const currDate=new Date();
    const budgets=await Budget.find({
        userId,
        startDate:{$lte :currDate},
        endDate:{$gte : currDate},
    });
    if(!budgets || budgets.length===0){
        res.status(404).json({message: "Budgets Not Found"});
    }
    else{
        res.status(200).json(budgets);
    }
};

async function trackBudgetExpense(req,res){
    const userId=req.params.userId;
    const category=req.params.category;
    if(!mongoose.Types.ObjectId.isValid(userId)){
        return res.status(400).json({message: "Invalid User Id"});
    }
    const currDate= new Date();
    const activeBudget=await Budget.findOne({
        userId,
        category,
        startDate:{$lte : currDate},
        endDate: {$gte: currDate},
    });
    if(!activeBudget){
        res.status(404).json({message: "No active budgets found for this category"});
    }
    const totalExpenseAgg= await Expense.aggregate([
        {
            $match:{
                userId,
                category,
                date:{
                    $gte:activeBudget.startDate,
                    $lte:activeBudget.endDate,
                },
            },
        },
        {
            $group:{
                _id:null,
                totalSpent:{$sum: "$amount"},
            },
        },
    ]);
    const totalSpent=totalExpenseAgg.length>0?totalExpenseAgg[0].totalSpent:0;
    const remaining=activeBudget.limitAmount-totalSpent;
    const isExceeded=(remaining<0);

    res.status(200).json({
        category,
        limitAmount: activeBudget.limitAmount,
        totalSpent,
        remaining,
        isExceeded,
        period: {
            start: activeBudget.startDate,
            end: activeBudget.endDate,
        },
    })

}

async function updateBudget(req,res){
    const {userId,category,limitAmount,startDate,endDate}=req.body;
    const id=req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message: "Invalid Budget Id"});
    }
    const budget=await Budget.findById(id);
    if(!budget){
        res.status(404).json({message: "Budget Not Found"});
    }
    else{
        budget.userId=userId;
        budget.category=category;
        budget.limitAmount=limitAmount;
        budget.startDate=startDate;
        budget.endDate=endDate;
        await budget.save();
        res.status(200).json({message: "Budget Updated Successfully."});
    }
};

async function deleteBudget(req,res){
    const id=req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message: "Invalid Budget Id"});
    }
    const budget=await Budget.findByIdAndDelete(id);
    if(!budget){
        res.status(404).json({message: "Budget Not Found"});
    }
    else{
        res.status(200).json({message: "Budget Deleted Successfully"});
    }
};

export {createBudget,getActiveBudget,trackBudgetExpense,updateBudget,deleteBudget};