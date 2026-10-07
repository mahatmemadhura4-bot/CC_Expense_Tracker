import { useEffect, useState } from "react"

import {
  useNavigate,
  useParams
} from "react-router-dom"

import ExpenseForm from "../components/ExpenseForm"

import {
  getExpense,
  updateExpense
} from "../services/expenseService"

function EditExpense() {

  const { id } = useParams()

  const navigate = useNavigate()

  const [expense, setExpense] =
    useState(null)

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState("")


  useEffect(() => {

    const fetchExpense = async () => {

      try {

        const data =
          await getExpense(id)

        setExpense(data)

      } catch (error) {

        setError(error.message)

      } finally {

        setLoading(false)

      }
    }

    fetchExpense()

  }, [id])


  const handleSubmit = async (
    expenseData
  ) => {

    await updateExpense(
      id,
      expenseData
    )

    navigate("/expenses")
  }


  if (loading) {

    return (
      <div className="app-page">

        <div className="container pastel-container text-center py-5">

          <div
            className="spinner-border pastel-spinner"
            role="status"
          />

          <p className="text-muted mt-3">
            Loading expense...
          </p>

        </div>

      </div>
    )
  }


  if (error) {

    return (
      <div className="app-page">

        <div className="container pastel-container">

          <div className="pastel-alert pastel-alert-danger">
            {error}
          </div>

        </div>

      </div>
    )
  }


  return (
    <div className="app-page">

      <div className="container pastel-container">

        <div className="mb-4">

          <h1 className="pastel-page-title">
            Edit Expense
          </h1>

          <p className="pastel-page-subtitle">
            Update the details of your expense.
          </p>

        </div>


        <div className="row">

          <div className="col-lg-7">

            <div className="pastel-form-card">

              <ExpenseForm
                initialData={expense}
                onSubmit={handleSubmit}
                buttonText="Save Changes"
              />

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default EditExpense