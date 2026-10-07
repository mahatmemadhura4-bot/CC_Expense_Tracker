import { Link } from "react-router-dom"

function ExpenseCard({ expense, onDelete }) {
const categoryIcons = {
  Food: "bi-egg-fried",
  Travel: "bi-airplane",
  Shopping: "bi-bag",
  Bills: "bi-receipt",
  Entertainment: "bi-film",
  Health: "bi-heart-pulse",
  Education: "bi-book",
  Other: "bi-three-dots"
}
  return (
    <div className="pastel-expense-row">

      <div className="row align-items-center">

        <div className="col-md-5">

          <div className="expense-description">
            {expense.description}
          </div>

          <div className="expense-meta">
            {new Date(
              expense.date
            ).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric"
            })}
          </div>

        </div>

        <div className="col-md-3 mt-2 mt-md-0">

          <span
            className={`category-badge category-${expense.category.toLowerCase()}`}
          >
            <i className={`bi ${categoryIcons[expense.category]}`}></i>

            {expense.category}
          </span>

        </div>

        <div className="col-md-2 mt-2 mt-md-0">

          <div className="expense-amount">
            ₹{Number(expense.amount).toLocaleString("en-IN")}
          </div>

        </div>

        <div className="col-md-2 text-md-end mt-2 mt-md-0">

          <Link
            to={`/edit-expense/${expense._id}`}
            className="btn-edit me-1"
          >
            Edit
          </Link>

          <button
            className="btn-delete"
            onClick={() =>
              onDelete(expense._id)
            }
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  )
}

export default ExpenseCard