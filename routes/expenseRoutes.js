import express from "express";
import { createExpense,getExpenseById, getExpenses,updateExpense, deleteExpense } from "../controllers/expenseController.js";

const router=express.Router();

router.post("/",createExpense);
router.get("/:id",getExpenseById);
router.get("/user/:userId",getExpenses);
router.put("/:id",updateExpense);
router.delete("/:id",deleteExpense);

export default router;