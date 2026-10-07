import { useEffect, useState } from "react"

import SummaryCard from "../components/SummaryCard"
import ExpenseList from "../components/ExpenseList"
import CategorySummary from "../components/CategorySummary"

import CategoryChart from "../charts/CategoryChart"
import MonthlyChart from "../charts/MonthlyChart"

import { getExpenses } from "../services/expenseService"

import { Link } from "react-router-dom"


function Dashboard() {

  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {

    const fetchExpenses = async () => {

      try {

        const data = await getExpenses()

        setExpenses(data)

      } catch (error) {

        setError(error.message)

      } finally {

        setLoading(false)

      }
    }

    fetchExpenses()

  }, [])

  const totalSpent = expenses.reduce(
    (total, expense) =>
      total + Number(expense.amount),
    0
  )

  const currentMonth =
    new Date().getMonth()

  const currentYear =
    new Date().getFullYear()

  const thisMonthExpenses =
    expenses.filter((expense) => {

      const expenseDate =
        new Date(expense.date)

      return (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      )

    })

  const thisMonthSpent =
    thisMonthExpenses.reduce(
      (total, expense) =>
        total + Number(expense.amount),
      0
    )

  const recentExpenses =
    [...expenses]
      .sort(
        (a, b) =>
          new Date(b.date) -
          new Date(a.date)
      )
      .slice(0, 5)

  if (loading) {

    return (
      <div className="app-page">

        <div className="container pastel-container text-center py-5">

          <div
            className="spinner-border pastel-spinner"
            role="status"
          />

          <p className="text-muted mt-3">
            Loading your dashboard...
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

        {/* WELCOME SECTION */}

        <div className="dashboard-welcome">

          <div className="row align-items-center">

            <div className="col-md-8">

              <h1 className="dashboard-welcome-title">
                Your spending, beautifully organized.
              </h1>

              <p className="dashboard-welcome-text">
                Keep track of your expenses and understand
                where your money goes.
              </p>

            </div>

            <div className="col-md-4 text-md-end mt-3 mt-md-0">

              <Link
                to="/add-expense"
                className="btn btn-pastel"
              >
                + Add Expense
              </Link>

            </div>

          </div>

        </div>


        {/* SUMMARY CARDS */}

        <div className="row">

          <SummaryCard
            title="Total Spent"
            value={`₹${totalSpent.toLocaleString("en-IN")}`}
            type="lavender"
            icon="bi-wallet2"
          />

          <SummaryCard
            title="This Month"
            value={`₹${currentMonth.toLocaleString("en-IN")}`}
            type="peach"
            icon="bi-calendar3"
          />

          <SummaryCard
            title="Expenses"
            value={expenses.length}
            type="pink"
            icon="bi-receipt"
          />

        </div>


        {/* CHARTS */}

        <div className="row mt-2">

          <div className="col-lg-7 mb-4">

            <div className="pastel-card chart-card h-100">

              <div className="pastel-card-header">

                <h5 className="section-title">
                  Monthly Spending
                </h5>

                <p className="section-subtitle">
                  Your spending throughout the year
                </p>

              </div>

              <div className="pastel-card-body">

                <MonthlyChart
                  expenses={expenses}
                />

              </div>

            </div>

          </div>


          <div className="col-lg-5 mb-4">

            <div className="pastel-card chart-card h-100">

              <div className="pastel-card-header">

                <div className="pastel-card-header">
                  <h5 className="section-title">
                    Category Summary
                  </h5>

                  <p className="section-subtitle mb-0">
                    See where your money is going
                  </p>
                </div>

                

              </div>

              <div className="pastel-card-body">

                <CategoryChart
                  expenses={expenses}
                />

              </div>

            </div>

          </div>

        </div>


        {/* CATEGORY + RECENT */}

        <div className="row">

          <div className="col-lg-5 mb-4">

            <CategorySummary
              expenses={expenses}
            />

          </div>


          <div className="col-lg-7 mb-4">

            <div className="pastel-card h-100">

              <div className="pastel-card-header">

                <div className="d-flex justify-content-between align-items-center">

                  <div className="pastel-card-header">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="section-title">
                          Recent Expenses
                        </h5>

                        <p className="section-subtitle mb-0">
                          Your latest spending activity
                        </p>
                      </div>

                      
                    </div>
                  </div>

                  <Link
                    to="/expenses"
                    className="btn-pastel-outline"
                  >
                    View All
                  </Link>

                </div>

              </div>


              <div className="pastel-card-body">

                {recentExpenses.length === 0 ? (

                  <div className="empty-state">

                    <div className="empty-state-icon">
                      ♡
                    </div>

                    <h5>
                      No expenses yet
                    </h5>

                    <p>
                      Add your first expense to
                      start tracking your spending.
                    </p>

                    <Link
                      to="/add-expense"
                      className="btn btn-pastel"
                    >
                      Add First Expense
                    </Link>

                  </div>

                ) : (

                  <ExpenseList
                    expenses={recentExpenses}
                    onDelete={() => { }}
                  />

                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Dashboard