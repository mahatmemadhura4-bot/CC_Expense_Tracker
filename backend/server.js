const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const expenseRoutes = require("./routes/expenseRoutes")

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/expenses", expenseRoutes)

// Test route
app.get("/", (req, res) => {
  res.send("Expense Tracker Backend is running")
})

// Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB connected")

//     app.listen(process.env.PORT, () => {
//       console.log(`Server running on port ${process.env.PORT}`)
//     })
//   })
//   .catch((error) => {
//     console.log("MongoDB connection failed")
//     console.log(error)
//   })

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    })

    console.log("MongoDB connected")

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`)
    })
  } catch (error) {
    console.log("MongoDB connection failed")
    console.log(error)

    console.log("Retrying MongoDB connection in 5 seconds...")
    setTimeout(connectDB, 5000)
  }
}

connectDB()