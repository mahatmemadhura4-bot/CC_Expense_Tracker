import { useNavigate } from "react-router-dom"

import ExpenseForm from "../components/ExpenseForm"

import { createExpense } from "../services/expenseService"

function AddExpense() {

  const navigate = useNavigate()

  const handleSubmit = async (expenseData) => {

    await createExpense(expenseData)

    navigate("/expenses")
  }

  return (
    <div className="app-page">

      <div className="container pastel-container">

        <div className="mb-4">

          <h1 className="pastel-page-title">
            Add Expense
          </h1>

          <p className="pastel-page-subtitle">
            Record a new expense and keep your
            spending organized.
          </p>

        </div>


        <div className="row">

          <div className="col-lg-7">

            <div className="pastel-form-card">

              <ExpenseForm
                onSubmit={handleSubmit}
                buttonText="Add Expense"
              />

            </div>

          </div>


          <div className="col-lg-5 mt-4 mt-lg-0">

            <div
              className="dashboard-welcome"
              style={{ height: "100%" }}
            >

              <h3 className="dashboard-welcome-title">
                A little expense,
                a clearer picture.
              </h3>

              <p className="dashboard-welcome-text mt-3">
                Add your expenses regularly to
                understand your spending habits
                and make better financial decisions.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default AddExpense