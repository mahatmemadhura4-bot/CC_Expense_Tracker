const mongoose = require("mongoose")

const expenseSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true
    },

    amount: {
      type: Number,
      required: true,
      min: 0.01
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Food",
        "Travel",
        "Shopping",
        "Bills",
        "Entertainment",
        "Health",
        "Education",
        "Other"
      ]
    },

    date: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model("Expense", expenseSchema)