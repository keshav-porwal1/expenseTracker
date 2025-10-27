import mongoose from "mongoose";

const {Schema} = mongoose;

const expenseSchema =new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    amount: Number,
    category: String,
    description: String,
    date: Date,
},{timestamps:true});

const Expense=new mongoose.model("Expense",expenseSchema);

export default Expense;