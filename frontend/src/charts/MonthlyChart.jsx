import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js"

import { Bar } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
)

function MonthlyChart({ expenses }) {

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ]

  const monthlyTotals = months.map(
    (_, monthIndex) => {

      return expenses
        .filter((expense) => {
          const date = new Date(expense.date)

          return (
            date.getMonth() === monthIndex
          )
        })
        .reduce(
          (total, expense) =>
            total + Number(expense.amount),
          0
        )
    }
  )

  if (expenses.length === 0) {
    return (
      <div className="empty-state py-5">
        <div className="empty-state-icon">
          ◌
        </div>

        <p className="mb-0">
          No monthly spending data yet
        </p>
      </div>
    )
  }

  const data = {
    labels: months,

    datasets: [
      {
        label: "Spending",

        data: monthlyTotals,

        backgroundColor: "#d9c8ec",

        borderRadius: 8,

        borderSkipped: false
      }
    ]
  }

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false
      }
    },

    scales: {
      y: {
        beginAtZero: true,

        grid: {
          color: "#f0eaef"
        },

        ticks: {
          color: "#817883"
        }
      },

      x: {
        grid: {
          display: false
        },

        ticks: {
          color: "#817883"
        }
      }
    }
  }

  return (
    <div
      className="chart-container"
      style={{ height: "320px" }}
    >
      <Bar
        data={data}
        options={options}
      />
    </div>
  )
}

export default MonthlyChart