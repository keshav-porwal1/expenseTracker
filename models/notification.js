import mongoose from "mongoose";

const {Schema}=mongoose;

const notificationSchema=new Schema({
    userId: {type: Schema.Types.ObjectId , ref: "User"},
    message: String,
    isRead:{type: Boolean, default: false},
    category: String,
},{timestamps: true});

const Notification= mongoose.model("Notification",notificationSchema);

export default Notification;