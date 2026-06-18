import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/TransactionsCard.css";

const TransactionsCard = ({ accountId, setError }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchTransactions = async () => {
    try {
      const response = await fetch(
        `http://localhost:8090/accounts/${accountId}/transactions`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const data = await response.json();
      setTransactions(data.slice(0, 10)); // Show only the first 10 transactions
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError?.("Failed to fetch transactions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accountId) {
      fetchTransactions();
    }
  }, [accountId]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="loading-message">
        <div className="loading-spinner"></div>
        Loading transactions...
      </div>
    );
  }

  return (
    <div className="transactions-card">
      <div className="card-header">
        <h2 className="card-title">Recent Transactions</h2>
        <button
          onClick={() => navigate(`/accounts/${accountId}/Add-transactions`)}
          className="add-transaction-button"
        >
          <span>➕</span> Add Transaction
        </button>
      </div>

      <div className="table-container">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Category</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td
                  className={`amount-cell ${transaction.amount >= 0 ? "positive" : "negative"}`}
                >
                  {formatCurrency(transaction.amount)}
                </td>
                <td className="category-cell">
                  <span
                    className={`category-badge ${transaction.category.toLowerCase()}`}
                  >
                    {transaction.category}
                  </span>
                </td>
                <td className="description-cell">{transaction.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsCard;
