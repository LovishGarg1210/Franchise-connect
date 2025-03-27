const Expense = require("../models/expense.js");

// Create a new expense
const doexpense = async (req, res) => {
  const expenseData = req.body;
  console.log(expenseData);

  try {
    const data = await Expense.create(expenseData);
    if (!data) {
      return res.status(400).json({ message: "Failed to create expense" });
    }
    res.status(201).json({ message: "Expense created successfully", data });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error: " + error.message });
  }
};

// Find all expenses
const dofindExpense = async (req, res) => {
  try {
    const data = await Expense.find({});
    if (!data) {
      return res.status(404).json({ message: "No expenses found" });
    }
    res.status(200).json({ message: "Data found", data });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error: " + error.message });
  }
};

// Update an existing expense
const doupdateExpense = async (req, res) => {
  const { id } = req.params;
  const expenseData = req.body;

  try {
    const data = await Expense.findByIdAndUpdate(id, expenseData, { new: true });
    if (!data) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({ message: "Expense updated successfully", data });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error: " + error.message });
  }
};

// Delete an existing expense
const dodeleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Expense.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error: " + error.message });
  }
};

module.exports = { doexpense, dofindExpense, doupdateExpense, dodeleteExpense };
