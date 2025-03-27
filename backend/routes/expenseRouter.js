const express=require("express")
const ExpenseRouter=express.Router();

const obj=require("../controller/Expense.js")

ExpenseRouter.post('/dosave',obj.doexpense);

ExpenseRouter.get('/dofind',obj.dofindExpense);
ExpenseRouter.put('/doupdate/:id',obj.doupdateExpense);

ExpenseRouter.delete('/dodelete/:id',obj.dodeleteExpense);
module.exports=ExpenseRouter

