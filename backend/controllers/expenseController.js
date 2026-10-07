const Expense = require("../models/Expense")

// Get all expenses
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 })

    res.status(200).json(expenses)
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch expenses"
    })
  }
}


// Get one expense
const getExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id)

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found"
      })
    }

    res.status(200).json(expense)
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch expense"
    })
  }
}


// Create expense
const createExpense = async (req, res) => {
  try {
    const {
      description,
      amount,
      category,
      date
    } = req.body

    const expense = await Expense.create({
      description,
      amount,
      category,
      date
    })

    res.status(201).json(expense)
  } catch (error) {
    res.status(400).json({
      message: "Failed to create expense",
      error: error.message
    })
  }
}


// Update expense
const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found"
      })
    }

    res.status(200).json(expense)
  } catch (error) {
    res.status(400).json({
      message: "Failed to update expense",
      error: error.message
    })
  }
}


// Delete expense
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(
      req.params.id
    )

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found"
      })
    }

    res.status(200).json({
      message: "Expense deleted successfully"
    })
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete expense"
    })
  }
}


module.exports = {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense
}