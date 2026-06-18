import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import TransactionsCard from "./TransactionsCard";
import "../style/AccountDetails.css";

const AccountDetails = () => {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const [error, setError] = useState("");

  // Fetch account details from the backend
  const fetchAccountDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8090/accounts/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setAccount(data);
    } catch (error) {
      console.error("Error fetching account details:", error);
      setError("Unable to load account details. Please try again later.");
    }
  };

  useEffect(() => {
    fetchAccountDetails();
  }, [id]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!account) {
    return <div className="loading-message">Loading account details...</div>;
  }

  return (
    <div className="account-details-body">
      <div className="account-details-container">
        <div className="sidebar">
          <div className="logo-container">
            <img
              src="https://open-frontend-bucket.s3.amazonaws.com/logos/logo-type-purple.svg"
              alt="Your Logo"
              className="logo"
            />
          </div>
          <div className="nav-cards">
            <Link to={`/account-details/${id}/cashflow`} className="nav-card">
              <h4>Cashflow Analytics</h4>
            </Link>
            <Link
              to={`/account-details/${id}/receivables`}
              className="nav-card"
            >
              <h4>Receivables</h4>
            </Link>
            <Link to={`/account-details/${id}/payables`} className="nav-card">
              <h4>Payables</h4>
            </Link>
            <Link to={`/account-details/${id}/reports`} className="nav-card">
              <h4>Reports</h4>
            </Link>
            <Link to={`/account-details/${id}/credit`} className="nav-card">
              <h4>Credit</h4>
            </Link>
            <Link to={`/account-details/${id}/insurance`} className="nav-card">
              <h4>Insurance</h4>
            </Link>
          </div>
        </div>
        <div className="details-container">
          <div className="details-card">
            <h2 className="details-title">Account Details</h2>
            <div className="details-grid">
              <div className="detail-item">
                <div className="detail-label">Account Type</div>
                <div className="detail-value">{account.accountType}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Account Number</div>
                <div className="detail-value">{account.accountNumber}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Bank Name</div>
                <div className="detail-value">{account.bankName}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Balance</div>
                <div className="detail-value">{account.balance || "N/A"}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Owner Name</div>
                <div className="detail-value">{account.accountHolderName}</div>
              </div>
            </div>
          </div>
          <TransactionsCard accountId={account?.id || id} />
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
