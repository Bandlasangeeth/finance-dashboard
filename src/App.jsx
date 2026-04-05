import { useState, useEffect } from 'react';
import SummaryCards from './components/SummaryCards';
import TransactionList from './components/TransactionList';
import Charts from './components/Charts';
import RoleSwitcher from './components/RoleSwitcher';

const mockTransactions = [
  { id: 1, date: "2026-04-01", description: "Salary", amount: 45000, type: "income", category: "Salary" },
  { id: 2, date: "2026-04-02", description: "Groceries", amount: 1200, type: "expense", category: "Food" },
  { id: 3, date: "2026-04-03", description: "Freelance", amount: 8000, type: "income", category: "Freelance" },
  { id: 4, date: "2026-04-04", description: "Electricity Bill", amount: 1800, type: "expense", category: "Bills" },
  { id: 5, date: "2026-04-05", description: "Movie Tickets", amount: 600, type: "expense", category: "Entertainment" },
];

function App() {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [role, setRole] = useState("viewer"); // viewer or admin
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Calculate summary
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  // Filter transactions
  const filteredTransactions = transactions
    .filter(t => {
      const matchesType = filterType === "all" || t.type === filterType;
      const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesType && matchesSearch;
    });

  const addTransaction = () => {
    if (role !== "admin") return alert("Only Admin can add transactions");
    
    const desc = prompt("Description:");
    const amt = parseInt(prompt("Amount:"));
    const typ = prompt("Type (income/expense):");
    const cat = prompt("Category:");

    if (desc && amt && typ && cat) {
      const newTrans = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        description: desc,
        amount: amt,
        type: typ,
        category: cat
      };
      setTransactions([...transactions, newTrans]);
    }
  };

  return (
    <div className="dashboard">
      <header>
        <h1> My Finance Dashboard</h1>
        <RoleSwitcher role={role} setRole={setRole} />
      </header>

      <SummaryCards 
        balance={balance} 
        income={totalIncome} 
        expense={totalExpense} 
      />

      <Charts income={totalIncome} expense={totalExpense} />

      <div className="transactions">
        <h2>Recent Transactions</h2>
        
        <div className="filters">
          <input 
            type="text" 
            placeholder="Search transactions..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All</option>
            <option value="income">Income Only</option>
            <option value="expense">Expense Only</option>
          </select>
          {role === "admin" && (
            <button onClick={addTransaction} style={{padding: "8px 16px", background:"#27ae60", color:"white", border:"none", borderRadius:"6px", cursor:"pointer"}}>
              + Add Transaction
            </button>
          )}
        </div>

        <TransactionList 
          transactions={filteredTransactions} 
          role={role} 
          setTransactions={setTransactions} 
        />
      </div>

      <div className="insights">
        <h2>Quick Insights</h2>
        <ul>
          <li>Highest spending category: Food</li>
          <li>This month income is higher than last month</li>
          <li>You saved ₹{balance > 0 ? balance : 0} this month</li>
          <li>Biggest expense: Electricity Bill</li>
        </ul>
      </div>
    </div>
  );
}

export default App;