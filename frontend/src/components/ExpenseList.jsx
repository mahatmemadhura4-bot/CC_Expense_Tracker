import ExpenseCard from "./ExpenseCard"

function ExpenseList({ expenses, onDelete }) {

  return (
    <div>

      {expenses.map((expense) => (
        <ExpenseCard
          key={expense._id}
          expense={expense}
          onDelete={onDelete}
        />
      ))}

    </div>
  )
}

export default ExpenseList