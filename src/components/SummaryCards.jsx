function SummaryCards({ balance, income, expense }) {
  return (
    <div className="summary">
      <div className="card">
        <h3>Total Balance</h3>
        <div className="amount balance">₹{balance.toLocaleString()}</div>
      </div>
      <div className="card">
        <h3>Total Income</h3>
        <div className="amount income">₹{income.toLocaleString()}</div>
      </div>
      <div className="card">
        <h3>Total Expenses</h3>
        <div className="amount expense">₹{expense.toLocaleString()}</div>
      </div>
    </div>
  );
}

export default SummaryCards;