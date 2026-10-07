const express = require("express")

const {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense
} = require("../controllers/expenseController")

const router = express.Router()

// GET all expenses
router.get("/", getExpenses)

// GET one expense
router.get("/:id", getExpense)

// POST new expense
router.post("/", createExpense)

// PUT update expense
router.put("/:id", updateExpense)

// DELETE expense
router.delete("/:id", deleteExpense)

module.exports = router