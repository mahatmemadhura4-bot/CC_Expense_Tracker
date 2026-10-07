import { useEffect, useState } from "react"

import ExpenseList from "../components/ExpenseList"

import {
  getExpenses,
  deleteExpense
} from "../services/expenseService"

import { Link } from "react-router-dom"

function Expenses() {

  const [expenses, setExpenses] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState("")

  const [search, setSearch] =
    useState("")

  const [category, setCategory] =
    useState("")

  const [sortBy, setSortBy] =
    useState("newest")


  const fetchExpenses = async () => {

    try {

      setLoading(true)

      const data =
        await getExpenses()

      setExpenses(data)

    } catch (error) {

      setError(error.message)

    } finally {

      setLoading(false)

    }
  }


  useEffect(() => {

    fetchExpenses()

  }, [])


  const handleDelete = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this expense?"
      )

    if (!confirmed) {
      return
    }

    try {

      await deleteExpense(id)

      setExpenses((currentExpenses) =>
        currentExpenses.filter(
          (expense) =>
            expense._id !== id
        )
      )

    } catch (error) {

      setError(error.message)

    }
  }


  const filteredExpenses =
    expenses
      .filter((expense) =>
        expense.description
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      )
      .filter((expense) =>
        category
          ? expense.category === category
          : true
      )
      .sort((a, b) => {

        if (sortBy === "newest") {

          return (
            new Date(b.date) -
            new Date(a.date)
          )
        }

        if (sortBy === "oldest") {

          return (
            new Date(a.date) -
            new Date(b.date)
          )
        }

        if (sortBy === "highest") {

          return (
            Number(b.amount) -
            Number(a.amount)
          )
        }

        if (sortBy === "lowest") {

          return (
            Number(a.amount) -
            Number(b.amount)
          )
        }

        return 0
      })


  if (loading) {

    return (
      <div className="app-page">

        <div className="container pastel-container text-center py-5">

          <div
            className="spinner-border pastel-spinner"
            role="status"
          />

          <p className="text-muted mt-3">
            Loading your expenses...
          </p>

        </div>

      </div>
    )
  }


  return (
    <div className="app-page">

      <div className="container pastel-container">

        {/* HEADER */}

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>

            <h1 className="pastel-page-title">
              Expenses
            </h1>

            <p className="pastel-page-subtitle">
              View and manage all your expenses.
            </p>

          </div>

          <Link
            to="/add-expense"
            className="btn btn-pastel"
          >
            + Add Expense
          </Link>

        </div>


        {/* ERROR */}

        {error && (
          <div className="pastel-alert pastel-alert-danger mb-4">
            {error}
          </div>
        )}


        {/* FILTERS */}

        <div className="filter-card mb-4">

          <div className="row g-3">

            <div className="col-lg-5">

              <label className="filter-label">
                Search
              </label>

              <input
                type="text"
                className="pastel-input"
                placeholder="Search by description..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />

            </div>


            <div className="col-lg-3">

              <label className="filter-label">
                Category
              </label>

              <select
                className="pastel-input"
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
              >

                <option value="">
                  All Categories
                </option>

                <option value="Food">
                  Food
                </option>

                <option value="Travel">
                  Travel
                </option>

                <option value="Shopping">
                  Shopping
                </option>

                <option value="Bills">
                  Bills
                </option>

                <option value="Entertainment">
                  Entertainment
                </option>

                <option value="Health">
                  Health
                </option>

                <option value="Education">
                  Education
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

            </div>


            <div className="col-lg-4">

              <label className="filter-label">
                Sort By
              </label>

              <select
                className="pastel-input"
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value)
                }
              >

                <option value="newest">
                  Newest First
                </option>

                <option value="oldest">
                  Oldest First
                </option>

                <option value="highest">
                  Highest Amount
                </option>

                <option value="lowest">
                  Lowest Amount
                </option>

              </select>

            </div>

          </div>

        </div>


        {/* EXPENSE LIST */}

        <div className="pastel-card">

          <div className="pastel-card-header">

            <h5 className="section-title">
              All Expenses
            </h5>

            <p className="section-subtitle">
              {filteredExpenses.length} expense
              {filteredExpenses.length !== 1
                ? "s"
                : ""}{" "}
              found
            </p>

          </div>


          <div className="pastel-card-body">

            {filteredExpenses.length === 0 ? (

              <div className="empty-state">

                <div className="empty-state-icon">
                  ♡
                </div>

                <h5>
                  No expenses found
                </h5>

                <p>
                  Try changing your filters
                  or add a new expense.
                </p>

                <Link
                  to="/add-expense"
                  className="btn btn-pastel"
                >
                  Add Expense
                </Link>

              </div>

            ) : (

              <ExpenseList
                expenses={filteredExpenses}
                onDelete={handleDelete}
              />

            )}

          </div>

        </div>

      </div>

    </div>
  )
}

export default Expenses