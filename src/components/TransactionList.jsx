function TransactionList({ transactions, role, setTransactions }) {
  const deleteTransaction = (id) => {
    if (role !== "admin") return;
    if (window.confirm("Delete this transaction?")) {
      setTransactions(transactions.filter(t => t.id !== id));
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Category</th>
          <th>Amount</th>
          {role === "admin" && <th>Action</th>}
        </tr>
      </thead>
      <tbody>
        {transactions.length === 0 ? (
          <tr><td colSpan={role === "admin" ? 5 : 4}>No transactions found</td></tr>
        ) : (
          transactions.map(t => (
            <tr key={t.id} className={t.type === "expense" ? "expense-row" : "income-row"}>
              <td>{t.date}</td>
              <td>{t.description}</td>
              <td>
                <span className="category-badge">{t.category}</span>
              </td>
              <td>₹{t.amount.toLocaleString()}</td>
              {role === "admin" && (
                <td>
                  <button 
                    onClick={() => deleteTransaction(t.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default TransactionList;