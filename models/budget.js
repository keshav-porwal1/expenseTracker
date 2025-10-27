import mongoose from "mongoose";


const {Schema}= mongoose;

const  budgetSchema=new Schema({
    userId:{type:Schema.Types.ObjectId , ref: "User"},
    category:String,
    limitAmount:Number,
    startDate:{type: Date, default:Date.now},
    endDate: Date,
},{timestamps:true});

const Budget=mongoose.model('Budget',budgetSchema);

export default Budget;