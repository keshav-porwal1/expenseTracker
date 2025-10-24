import express from "express";
import { registerUser,loginUser,getUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/authorization.js";

const router=express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/:id",authMiddleware,getUser);

export default router;