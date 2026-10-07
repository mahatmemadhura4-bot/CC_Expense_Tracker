// import "./App.css"

// import {
//   BrowserRouter,
//   Routes,
//   Route
// } from "react-router-dom"

// import Navbar from "./components/Navbar"

// import Dashboard from "./pages/Dashboard"
// import Expenses from "./pages/Expenses"
// import AddExpense from "./pages/AddExpense"
// import EditExpense from "./pages/EditExpense"


// function App() {

//   return (
//     <BrowserRouter>

//       <Navbar />

//       <Routes>

//         <Route
//           path="/"
//           element={<Dashboard />}
//         />

//         <Route
//           path="/expenses"
//           element={<Expenses />}
//         />

//         <Route
//           path="/add-expense"
//           element={<AddExpense />}
//         />

//         <Route
//           path="/edit-expense/:id"
//           element={<EditExpense />}
//         />

//       </Routes>

//     </BrowserRouter>
//   )
// }

// export default App

import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"

import Dashboard from "./pages/Dashboard"
import Expenses from "./pages/Expenses"
import AddExpense from "./pages/AddExpense"
import EditExpense from "./pages/EditExpense"


function App() {

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/expenses"
          element={<Expenses />}
        />

        <Route
          path="/add-expense"
          element={<AddExpense />}
        />

        <Route
          path="/edit-expense/:id"
          element={<EditExpense />}
        />

      </Routes>
      

    </BrowserRouter>
  )
}

export default App