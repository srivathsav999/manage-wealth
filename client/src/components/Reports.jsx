import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../style/Reports.css";

const Reports = () => {
  const { id } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    receivables: 0,
    payables: 0,
    balance: 0,
  });

  const fetchTransactions = async () => {
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
      setTransactions(data);

      const receivables = data
        .filter((txn) => txn.category === "Receivables")
        .reduce((sum, txn) => sum + txn.amount, 0);
      const payables = data
        .filter((txn) => txn.category === "Payables")
        .reduce((sum, txn) => sum + txn.amount, 0);

      setSummary({
        receivables,
        payables,
        balance: receivables - payables,
      });
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError("Unable to load reports. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
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

  if (loading) {
    return (
      <div className="loading-message">
        <div className="loading-spinner"></div>
        Loading reports...
      </div>
    );
  }

  return (
    <div className="reports-container">
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
          <Link to={`/account-details/${id}/payables`} className="nav-link">
            <h4>Payables</h4>
          </Link>
          <Link
            to={`/account-details/${id}/reports`}
            className="nav-link active"
          >
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
        <div className="reports-header">
          <h1 className="page-title">Financial Reports</h1>
        </div>

        <div className="summary-section">
          <div className="summary-card">
            <div className="summary-title">Total Receivables</div>
            <div className="summary-value positive">
              {formatCurrency(summary.receivables)}
            </div>
            <div className="summary-trend">Incoming payments</div>
          </div>
          <div className="summary-card">
            <div className="summary-title">Total Payables</div>
            <div className="summary-value negative">
              {formatCurrency(summary.payables)}
            </div>
            <div className="summary-trend">Outgoing payments</div>
          </div>
          <div className="summary-card">
            <div className="summary-title">Net Balance</div>
            <div
              className={`summary-value ${summary.balance >= 0 ? "positive" : "negative"}`}
            >
              {formatCurrency(summary.balance)}
            </div>
            <div className="summary-trend">Overall financial position</div>
          </div>
        </div>

        <div className="transactions-section">
          <h2 className="section-title">Transaction History</h2>
          <ul className="transactions-list">
            {transactions.map((transaction) => (
              <li key={transaction._id} className="transaction-item">
                <div
                  className={`transaction-icon ${transaction.category.toLowerCase()}`}
                >
                  {transaction.category === "Receivables" ? "💰" : "💸"}
                </div>
                <div className="transaction-details">
                  <span className="transaction-description">
                    {transaction.description}
                  </span>
                  <span className="transaction-category">
                    {transaction.category}
                  </span>
                </div>
                <span
                  className={`transaction-amount ${transaction.category.toLowerCase()}`}
                >
                  {formatCurrency(transaction.amount)}
                </span>
                <span className="transaction-date">
                  {formatDate(transaction.transactionDate)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Reports;
