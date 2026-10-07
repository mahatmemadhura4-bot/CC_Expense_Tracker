import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js"

import { Doughnut } from "react-chartjs-2"

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)

function CategoryChart({ expenses }) {

  const categories = [
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Entertainment",
    "Health",
    "Education",
    "Other"
  ]

  const categoryTotals = categories.map((category) => {
    return expenses
      .filter((expense) => expense.category === category)
      .reduce(
        (total, expense) => total + Number(expense.amount),
        0
      )
  })

  const filteredCategories = categories.filter(
    (_, index) => categoryTotals[index] > 0
  )

  const filteredTotals = categoryTotals.filter(
    (total) => total > 0
  )

  if (expenses.length === 0 || filteredTotals.length === 0) {
    return (
      <div className="empty-state py-4">
        <div className="empty-state-icon">
          ◌
        </div>

        <p className="mb-0">
          No spending data yet
        </p>
      </div>
    )
  }

  const data = {
    labels: filteredCategories,

    datasets: [
      {
        data: filteredTotals,

        backgroundColor: [
          "#d9c8ec",
          "#f5cbb8",
          "#f0d4df",
          "#d2e8df",
          "#d3e3f3",
          "#e8dfc7",
          "#e0d4ee",
          "#f1d9ce"
        ],

        borderWidth: 3,
        borderColor: "#ffffff"
      }
    ]
  }

  const options = {
    responsive: true,

    plugins: {
      legend: {
        position: "bottom",

        labels: {
          padding: 18,
          usePointStyle: true,
          font: {
            size: 11
          }
        }
      }
    }
  }

  return (
    <div className="chart-container-small">
      <Doughnut
        data={data}
        options={options}
      />
    </div>
  )
}

export default CategoryChart