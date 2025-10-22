import express from "express";
import { createNotification,getNotifications,markAsRead } from "../controllers/notificationController.js";

const router= express.Router();

router.post("/",createNotification);
router.get("/user/:userId",getNotifications);
router.put("/:id",markAsRead);

export default router;