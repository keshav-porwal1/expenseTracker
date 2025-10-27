import express from "express";
import getDashboardData from "../controllers/dashboardController.js";
import authMiddleware from "../middleware/authorization.js";

const router = express.Router();

router.get("/:userId",getDashboardData);

export default router;