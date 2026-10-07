function SummaryCard({ title, value, type = "lavender", icon }) {
  return (
    <div className="col-md-4 mb-3">
      <div className={`pastel-summary-card summary-${type}`}>

        <div className="summary-icon">
          <i className={`bi ${icon}`}></i>
        </div>

        <div className="summary-content">
          <p className="summary-label">
            {title}
          </p>

          <h3 className="summary-value">
            {value}
          </h3>
        </div>

      </div>
    </div>
  )
}

export default SummaryCard