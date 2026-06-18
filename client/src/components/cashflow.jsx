import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../style/CashflowAnalytics.css";

const CashflowAnalytics = () => {
  const { id } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const [analytics, setAnalytics] = useState({
    totalInflows: 0,
    totalOutflows: 0,
    netCashflow: 0,
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
      calculateAnalytics(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError("Unable to load transactions. Please try again later.");
    }
  };

  const calculateAnalytics = (data) => {
    const totalInflows = data
      .filter((txn) => txn.category === "Receivables")
      .reduce((sum, txn) => sum + txn.amount, 0);

    const totalOutflows = data
      .filter((txn) => txn.category === "Payables")
      .reduce((sum, txn) => sum + txn.amount, 0);

    const netCashflow = totalInflows - totalOutflows;

    setAnalytics({
      totalInflows,
      totalOutflows,
      netCashflow,
    });
  };

  useEffect(() => {
    fetchTransactions();
  }, [id]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!transactions.length) {
    return <div className="loading-message">Loading cashflow analytics...</div>;
  }

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

  return (
    <div className="cashflow-container">
      <div className="sidebar">
        <div className="logo-container">
          <img
            src="https://open-frontend-bucket.s3.amazonaws.com/logos/logo-type-purple.svg"
            alt="Open Logo"
            className="logo"
          />
        </div>
        <div className="nav-cards">
          <Link
            to={`/account-details/${id}/cashflow`}
            className="nav-link active"
          >
            <h4>Cashflow Analytics</h4>
          </Link>
          <Link to={`/account-details/${id}/receivables`} className="nav-link">
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
        <div className="analytics-header">
          <h1 className="page-title">Cashflow Analytics</h1>
        </div>

        <div className="analytics-grid">
          <div className="analytics-card">
            <div className="card-title">Total Inflows</div>
            <div className="card-value inflow-value">
              {formatCurrency(analytics.totalInflows)}
            </div>
          </div>

          <div className="analytics-card">
            <div className="card-title">Total Outflows</div>
            <div className="card-value outflow-value">
              {formatCurrency(analytics.totalOutflows)}
            </div>
          </div>

          <div className="analytics-card">
            <div className="card-title">Net Cashflow</div>
            <div className="card-value net-value">
              {formatCurrency(analytics.netCashflow)}
            </div>
          </div>
        </div>

        <div className="transactions-section">
          <h2 className="section-title">Transaction History</h2>
          <ul className="transactions-list">
            {transactions.map((transaction) => (
              <li key={transaction._id} className="transaction-item">
                <span
                  className={`transaction-category category-${transaction.category.toLowerCase()}`}
                >
                  {transaction.category}
                </span>
                <div className="transaction-details">
                  <span className="transaction-description">
                    {transaction.description}
                  </span>
                  <span className="transaction-date">
                    {formatDate(transaction.transactionDate)}
                  </span>
                </div>
                <span
                  className={`transaction-amount amount-${transaction.category.toLowerCase()}`}
                >
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

export default CashflowAnalytics;
