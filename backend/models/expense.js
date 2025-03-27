const mongoose=require("mongoose");
const ExpenseSchema= new mongoose.Schema({
  
    expenseAmount:{type:Number,required:true},
    expenseDate:{type:String},
    expenseCategory:{type:String,required:true},
   
    expenseDescription:{type:String,required:true},
    email:{
        type:String,
        default:'',
    }
   
   
})

const Expense=mongoose.model("Expense",ExpenseSchema)

module.exports=Expense;