import mongoose from "mongoose";
import Notification from "../models/notification.js";

async function createNotification(req,res){
    const {userId,message,isRead,category}=req.body; 
    const notification=new Notification({
        userId,
        message,
        isRead,
        category,
    });
    await notification.save();
    res.status(201).json({message: "Notification Created Successfully", notification});
};

async function getNotifications(req,res){
    const userId=req.params.userId;
    if(!mongoose.Types.ObjectId.isValid(userId)){
        return res.status(400).json({message : "Invalid userId"});
    }
    const notifications=await Notification.find({userId});
    if(!notifications || notifications.length===0){
        res.status(404).json({message: "Notification Not Found"});
    }
    else{
        res.status(200).json(notifications);
    }
}

async function markAsRead(req,res){
    const id=req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message: "Invalid id"});
    }
    const notification=await Notification.findById(id);
    if(!notification){
        res.status(404).json({message: "Notification Not Found"});
    }
    else{
        notification.isRead=true;
        await notification.save();
        res.status(200).json({message : "Notification marked as read succefully"});
    }
}

export {createNotification,getNotifications,markAsRead};