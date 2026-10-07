import { useEffect, useState } from "react"

function ExpenseForm({
  initialData = null,
  onSubmit,
  buttonText = "Save Expense"
}) {

  const [description, setDescription] =
    useState("")

  const [amount, setAmount] =
    useState("")

  const [category, setCategory] =
    useState("")

  const [date, setDate] =
    useState("")

  const [error, setError] =
    useState("")

  useEffect(() => {

    if (initialData) {

      setDescription(
        initialData.description || ""
      )

      setAmount(
        initialData.amount || ""
      )

      setCategory(
        initialData.category || ""
      )

      setDate(
        initialData.date
          ? initialData.date.substring(0, 10)
          : ""
      )
    }

  }, [initialData])

  const handleSubmit = async (event) => {

    event.preventDefault()

    setError("")

    if (!description.trim()) {
      setError("Please enter a description.")
      return
    }

    if (!amount || Number(amount) <= 0) {
      setError("Amount must be greater than 0.")
      return
    }

    if (!category) {
      setError("Please select a category.")
      return
    }

    if (!date) {
      setError("Please select a date.")
      return
    }

    const expenseData = {
      description: description.trim(),
      amount: Number(amount),
      category,
      date
    }

    try {

      await onSubmit(expenseData)

    } catch (error) {

      setError(
        error.message ||
        "Something went wrong."
      )

    }
  }

  return (
    <form onSubmit={handleSubmit}>

      {error && (
        <div className="pastel-alert pastel-alert-danger mb-4">
          {error}
        </div>
      )}


      {/* DESCRIPTION */}

      <div className="mb-4">

        <label className="pastel-label">
          Description
        </label>

        <input
          type="text"
          className="pastel-input"
          placeholder="e.g. Dinner with friends"
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
        />

      </div>


      {/* AMOUNT */}

      <div className="mb-4">

        <label className="pastel-label">
          Amount
        </label>

        <input
          type="number"
          className="pastel-input"
          placeholder="e.g. 850"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={(event) =>
            setAmount(event.target.value)
          }
        />

      </div>


      {/* CATEGORY */}

      <div className="mb-4">

        <label className="pastel-label">
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
            Select a category
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


      {/* DATE */}

      <div className="mb-4">

        <label className="pastel-label">
          Date
        </label>

        <input
          type="date"
          className="pastel-input"
          value={date}
          onChange={(event) =>
            setDate(event.target.value)
          }
        />

      </div>


      <button
        type="submit"
        className="btn btn-pastel w-100"
      >
        {buttonText}
      </button>

    </form>
  )
}

export default ExpenseForm