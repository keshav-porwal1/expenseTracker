import mongoose from "mongoose";

const {Schema} = mongoose;

const userSchema=new Schema({
    name:String,
    email:{type: String, unique: true},
    password:String,
    role:{type: String, enum: ["user","admin"], default: "user"}
});

const User=mongoose.model("User",userSchema);

export default User;