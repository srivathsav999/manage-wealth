import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../style/Payables.css";

const Payables = () => {
  const { id } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const [summary, setSummary] = useState({
    totalPayables: 0,
    averageAmount: 0,
    totalTransactions: 0,
  });

  const fetchPayables = async () => {
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
      const payables = data.filter((txn) => txn.category === "Payables");
      setTransactions(payables);

      // Calculate summary
      const total = payables.reduce((sum, txn) => sum + txn.amount, 0);
      setSummary({
        totalPayables: total,
        averageAmount: payables.length
          ? Math.round(total / payables.length)
          : 0,
        totalTransactions: payables.length,
      });
    } catch (error) {
      console.error("Error fetching payables:", error);
      setError("Unable to load payables. Please try again later.");
    }
  };

  useEffect(() => {
    fetchPayables();
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
        Loading payables...
      </div>
    );
  }

  return (
    <div className="payables-container">
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
          <Link to={`/account-details/${id}/receivables`} className="nav-link">
            <h4>Receivables</h4>
          </Link>
          <Link
            to={`/account-details/${id}/payables`}
            className="nav-link active"
          >
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
        <div className="payables-header">
          <h1 className="page-title">Payables</h1>
        </div>

        <div className="summary-cards">
          <div className="summary-card">
            <div className="summary-title">Total Payables</div>
            <div className="summary-value">
              {formatCurrency(summary.totalPayables)}
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
                <div className="transaction-icon">💸</div>
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

export default Payables;
