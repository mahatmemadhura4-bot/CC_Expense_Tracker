function CategorySummary({ expenses }) {

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

  const categoryData = categories
    .map((category) => {

      const total = expenses
        .filter(
          (expense) =>
            expense.category === category
        )
        .reduce(
          (sum, expense) =>
            sum + Number(expense.amount),
          0
        )

      return {
        category,
        total
      }
    })
    .filter((item) => item.total > 0)

  const grandTotal = categoryData.reduce(
    (sum, item) => sum + item.total,
    0
  )

  if (categoryData.length === 0) {
    return (
      <div className="pastel-card h-100">
        <div className="pastel-card-body">
          <h5 className="section-title">
            Category Summary
          </h5>

          <p className="section-subtitle mb-0">
            Your spending categories will appear here.
          </p>

          <div className="empty-state py-5">
            <div className="empty-state-icon">
              ♡
            </div>

            <p className="mb-0">
              No category data yet
            </p>
          </div>
        </div>
      </div>
    )
  }



  return (
    <div className="pastel-card h-100">
      <div className="pastel-card-body">

        <h5 className="section-title">
          Category Summary
        </h5>

        <p className="section-subtitle mb-3">
          Where your money is going
        </p>

        {categoryData.map((item) => {

          const percentage =
            grandTotal > 0
              ? (item.total / grandTotal) * 100
              : 0


          const categoryColors = {
            Food: "#f9d9c8",            // Peach
            Travel: "#dceafa",          // Baby Blue
            Shopping: "#f3dce7",        // Soft Pink
            Bills: "#e9e0f7",           // Lavender
            Entertainment: "#f5e8c8",   // Soft Yellow
            Health: "#dcefe7",          // Mint
            Education: "#e4d9f2",       // Light Purple
            Other: "#eee7e5"            // Beige
          }

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
            <div
              className="category-item"
              key={item.category}
            >


              <div className="d-flex justify-content-between align-items-center">

                <div className="d-flex align-items-center gap-2">
                  <i className={`bi ${categoryIcons[item.category]}`}></i>

                  <span className="category-name">
                    {item.category}
                  </span>
                </div>

                <span className="category-amount">
                  ₹{item.total.toLocaleString("en-IN")}
                </span>

              </div>


              {/* <div className="progress" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                <div className={`progress-bar ${categoryColors[item.category]}`} style={{ width: `${percentage}%` }}></div>
              </div> */}

              <div
                className="progress"
                role="progressbar"
                aria-valuenow={percentage}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{
                  height: "7px",
                  backgroundColor: "#f3eef5",
                  borderRadius: "50px"
                }}
              >
                <div
                  className="progress-bar"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: categoryColors[item.category],
                    borderRadius: "50px"
                  }}
                ></div>
              </div>



            </div>
          )
        })}

      </div>
    </div>
  )
}

export default CategorySummary