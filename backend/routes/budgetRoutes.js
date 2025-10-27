import express from "express";
import { createBudget,getActiveBudget,trackBudgetExpense,updateBudget,deleteBudget } from "../controllers/budgetController.js";

const router=express.Router();

router.post("/",createBudget);
router.get("/user/:userId",getActiveBudget);
router.get("/track/:userId/:category",trackBudgetExpense);
router.put("/:id",updateBudget);
router.delete("/:id",deleteBudget);

export default router;
