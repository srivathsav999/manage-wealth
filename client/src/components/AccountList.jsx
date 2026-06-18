import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/AccountList.css";

const AccountList = ({ setError }) => {
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();

  // Verify token existence and handle redirection if absent
  const verifyToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return false;
    }
    return true;
  };

  // Fetch account data from backend
  const fetchAccounts = async () => {
    if (!verifyToken()) return;

    try {
      const response = await fetch("http://localhost:8090/accounts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      setAccounts(data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
      setError("Failed to fetch accounts. Please try again later.");
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // Handle navigation to Add Account Form
  const handleAddAccountClick = () => {
    navigate("/AddAccountForm");
  };

  return (
    <div className="accounts-dashboard">
      <div className="accounts-grid">
        {accounts.map((account) => (
          <div key={account._id} className="account-card">
            <div className="account-header">
              <h3>{account.accountType}</h3>
              <div className="account-status">Active</div>
            </div>
            <div className="account-body">
              <div className="account-info">
                <div className="info-item">
                  <span className="info-label">Account Number</span>
                  <span className="info-value">{account.accountNumber}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Bank Name</span>
                  <span className="info-value">{account.bankName}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Account Holder</span>
                  <span className="info-value">
                    {account.accountHolderName}
                  </span>
                </div>
              </div>
              <div className="account-actions">
                <button
                  onClick={() => navigate(`/account-details/${account._id}`)}
                  className="view-details-button"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="add-account-section">
        <button onClick={handleAddAccountClick} className="add-account-button">
          <span className="plus-icon">+</span>
          Add New Account
        </button>
      </div>
    </div>
  );
};

export default AccountList;
