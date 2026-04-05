function Charts({ income, expense }) {
  
  const spendingByCategory = [
    { name: "Food", amount: 4500, color: "#e74c3c" },
    { name: "Transport", amount: 2800, color: "#f39c12" },
    { name: "Home", amount: 6200, color: "#3498db" },
    { name: "Miscellaneous", amount: 1900, color: "#9b59b6" },
    { name: "Savings", amount: 12000, color: "#27ae60" },
    { name: "Stocks", amount: 8500, color: "#2ecc71" },
  ];

  const totalSpending = spendingByCategory.reduce((sum, cat) => sum + cat.amount, 0);

  // Build simple conic-gradient
  let start = 0;
  const gradientParts = spendingByCategory.map(cat => {
    const percent = (cat.amount / totalSpending) * 100;
    const end = start + percent;
    const part = `${cat.color} ${start.toFixed(1)}% ${end.toFixed(1)}%`;
    start = end;
    return part;
  });

  const conicGradient = `conic-gradient(${gradientParts.join(", ")})`;

  return (
    <div className="charts">
      {/* Balance Trend */}
      <div className="chart-box">
        <h3>Balance Trend (Last 6 Months)</h3>
        <div className="balance-bars">
          {[
            { month: 'Jan', balance: 13000 },
            { month: 'Feb', balance: 20000 },
            { month: 'Mar', balance: 15000 },
            { month: 'Apr', balance: 27000 },
            { month: 'May', balance: 21000 },
            { month: 'Jun', balance: 29000 },
          ].map((item, index) => (
            <div key={index} className="bar-row">
              <div className="month">{item.month}</div>
              <div className="bar-wrapper">
                <div 
                  className="horizontal-bar"
                  style={{ width: `${(item.balance / 29000) * 100}%` }}
                />
              </div>
              <div className="amount">₹{(item.balance/1000).toFixed(0)}k</div>
            </div>
          ))}
        </div>
      </div>

      {/* Spending Breakdown - Fixed Pie Chart */}
      <div className="chart-box">
        <h3>Spending Breakdown</h3>
        
        <div className="pie-container">
          <div 
            className="pie-chart"
            style={{ background: conicGradient }}
          />
          <div className="pie-center">
            ₹{(totalSpending / 1000).toFixed(0)}k
          </div>
        </div>

        <div className="legend">
          {spendingByCategory.map((cat, index) => {
            const percent = ((cat.amount / totalSpending) * 100).toFixed(1);
            return (
              <div key={index} className="legend-item">
                <span 
                  className="color-dot" 
                  style={{ backgroundColor: cat.color }}
                ></span>
                <span className="category-name">{cat.name}</span>
                <span className="category-amount">₹{cat.amount.toLocaleString()}</span>
                <span className="category-percent">({percent}%)</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Charts;