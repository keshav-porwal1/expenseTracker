import express from "express";
import {createIncome,getIncomeById,getIncomes,updateIncome,deleteIncome} from "../controllers/incomeController.js"
import authMiddleware from "../middleware/authorization.js";

const router=express.Router();

router.post("/",createIncome);
router.get("/user/:userId",getIncomes);
router.get("/:id",getIncomeById);
router.put("/:id",updateIncome);
router.delete("/:id",deleteIncome);

export default router;