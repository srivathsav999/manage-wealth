import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../style/Receivables.css";

const Receivables = () => {
  const { id } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const [summary, setSummary] = useState({
    totalReceivables: 0,
    averageAmount: 0,
    totalTransactions: 0,
  });

  const fetchReceivables = async () => {
    try {
      const response = await fetch(
        `http://localhost:8090/accounts/${id}/transactions`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const receivables = data.filter((txn) => txn.category === "Receivables");
      setTransactions(receivables);

      // Calculate summary
      const total = receivables.reduce((sum, txn) => sum + txn.amount, 0);
      setSummary({
        totalReceivables: total,
        averageAmount: receivables.length
          ? Math.round(total / receivables.length)
          : 0,
        totalTransactions: receivables.length,
      });
    } catch (error) {
      console.error("Error fetching receivables:", error);
      setError("Unable to load receivables. Please try again later.");
    }
  };

  useEffect(() => {
    fetchReceivables();
  }, [id]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!transactions.length) {
    return (
      <div className="loading-message">
        <div className="loading-spinner"></div>
        Loading receivables...
      </div>
    );
  }

  return (
    <div className="receivables-container">
      <div className="sidebar">
        <div className="logo-container">
          <img
            src="https://open-frontend-bucket.s3.amazonaws.com/logos/logo-type-purple.svg"
            alt="Open Logo"
            className="logo"
          />
        </div>
        <div className="nav-cards">
          <Link to={`/account-details/${id}/cashflow`} className="nav-link">
            <h4>Cashflow Analytics</h4>
          </Link>
          <Link
            to={`/account-details/${id}/receivables`}
            className="nav-link active"
          >
            <h4>Receivables</h4>
          </Link>
          <Link to={`/account-details/${id}/payables`} className="nav-link">
            <h4>Payables</h4>
          </Link>
          <Link to={`/account-details/${id}/reports`} className="nav-link">
            <h4>Reports</h4>
          </Link>
          <Link to={`/account-details/${id}/credit`} className="nav-link">
            <h4>Credit</h4>
          </Link>
          <Link to={`/account-details/${id}/insurance`} className="nav-link">
            <h4>Insurance</h4>
          </Link>
        </div>
      </div>

      <div className="main-content">
        <div className="receivables-header">
          <h1 className="page-title">Receivables</h1>
        </div>

        <div className="summary-cards">
          <div className="summary-card">
            <div className="summary-title">Total Receivables</div>
            <div className="summary-value">
              {formatCurrency(summary.totalReceivables)}
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-title">Average Amount</div>
            <div className="summary-value">
              {formatCurrency(summary.averageAmount)}
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-title">Total Transactions</div>
            <div className="summary-value">{summary.totalTransactions}</div>
          </div>
        </div>

        <div className="transactions-section">
          <h2 className="section-title">Transaction History</h2>
          <ul className="transactions-list">
            {transactions.map((transaction) => (
              <li key={transaction._id} className="transaction-item">
                <div className="transaction-icon">💰</div>
                <div className="transaction-details">
                  <span className="transaction-description">
                    {transaction.description}
                  </span>
                  <span className="transaction-date">
                    {formatDate(transaction.transactionDate)}
                  </span>
                </div>
                <span className="transaction-amount">
                  {formatCurrency(transaction.amount)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Receivables;
