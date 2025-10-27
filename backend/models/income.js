import mongoose from "mongoose";

const {Schema}= mongoose;

const incomeSchema=new Schema({
    userId: { type :Schema.Types.ObjectId, ref:'User'},
    amount: Number,
    source: String,
    description: String,
    date: Date,
},{timestamps:true});

const Income=new mongoose.model('Income',incomeSchema);

export default Income;