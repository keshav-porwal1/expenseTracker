import mongoose from "mongoose";
import Income from "../models/income.js";
import Expense from "../models/expense.js";
import Budget from "../models/budget.js";
import Notification from "../models/notification.js";


async function getDashboardData(req,res){
    const userId=req.params.userId;
    if(!mongoose.Types.ObjectId.isValid(userId)){
        return res.status(400).json({message: "Invalid userId"});
    }
    const totalIncome= await Income.aggregate([
        {
            $match:{
                userId: userId
            }
        },
        {
            $group:{
                _id:null,
                total: {$sum : "$amount"}
            }
        }
    ]);
    const incomeResult= totalIncome.length>0 ? totalIncome[0].total: 0;

    const totalExpense=await Expense.aggregate([
        {
            $match:{
                userId: userId
            }
        },
        {
            $group:{
                _id:null,
                total: {$sum : "$amount"}
            }
        }
    ]);
    const expenseResult= totalExpense.length>0 ? totalExpense[0].total : 0;

    const remainingBalance=incomeResult-expenseResult;

    const currDate= new Date();
    const activeBudgets= await Budget.find({
        userId,
        startDate: {$lte: currDate},
        endDate: {$gte: currDate},
    });

    const unreadNotifications= await Notification.find({
        userId,
        isRead: false,
    });

    res.status(200).json({
        incomeResult,
        expenseResult,
        remainingBalance,
        activeBudgets,
        unreadNotifications
    });
}

export default getDashboardData;
