import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg pastel-navbar">
      <div className="container pastel-container">

        <Link
          to="/"
          className="navbar-brand pastel-brand"
        >
          Expense<span>Tracker</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarContent"
        >
          <div className="navbar-nav ms-auto">

            <Link
              to="/"
              className="nav-link pastel-nav-link"
            >
              Dashboard
            </Link>

            <Link
              to="/expenses"
              className="nav-link pastel-nav-link"
            >
              Expenses
            </Link>

            <Link
              to="/add-expense"
              className="nav-link pastel-nav-link"
            >
              Add Expense
            </Link>

          </div>
        </div>

      </div>
    </nav>
  )
}

export default Navbar