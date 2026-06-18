import React, { useState } from "react";
import "../style/AddAccountForm.css";

const AddAccountForm = ({ setError: setGlobalError }) => {
  const [formData, setFormData] = useState({
    accountType: "",
    accountNumber: "",
    bankName: "",
    accountHolderName: "",
  });
  const [localError, setLocalError] = useState("");
  const [success, setSuccess] = useState("");

  const accountTypes = [
    "Savings Account",
    "Current Account",
    "Fixed Deposit Account",
    "Recurring Deposit Account",
    "Loan Account",
    "NRI Account",
    "Salary Account",
  ];

  const banks = [
    "State Bank of India",
    "HDFC Bank",
    "ICICI Bank",
    "Axis Bank",
    "Punjab National Bank",
    "Bank of Baroda",
    "Union Bank of India",
    "Canara Bank",
    "Kotak Mahindra Bank",
    "IDFC First Bank",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setLocalError("");
    setSuccess("");
  };

  const handleAddAccount = async (e) => {
    e.preventDefault();
    const { accountType, accountNumber, bankName, accountHolderName } =
      formData;

    if (
      !accountType ||
      !accountNumber.trim() ||
      !bankName ||
      !accountHolderName.trim()
    ) {
      setLocalError("All fields are required");
      return;
    }

    try {
      const token = `Bearer ${localStorage.getItem("token")}`;
      const response = await fetch("http://localhost:8090/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormData({
          accountType: "",
          accountNumber: "",
          bankName: "",
          accountHolderName: "",
        });
        setSuccess("Account added successfully!");
        if (setGlobalError) setGlobalError("");
      } else {
        setLocalError(data.error || "Failed to add account. Please try again.");
        if (setGlobalError)
          setGlobalError(data.error || "Failed to add account");
      }
    } catch (error) {
      const errorMessage =
        "An error occurred while adding the account. Please try again later.";
      setLocalError(errorMessage);
      if (setGlobalError) setGlobalError(errorMessage);
    }
  };

  return (
    <div className="add-account-container">
      <div className="form-wrapper">
        <div className="form-sidebar">
          <div className="sidebar-content">
            <img
              src="https://open-frontend-bucket.s3.amazonaws.com/logos/logo-type-white.svg"
              alt="Logo"
              className="form-logo"
            />
            <h2 className="sidebar-title">Add Your Bank Account</h2>
            <p className="sidebar-text">
              Link your bank account to start managing your finances
              efficiently. We ensure your data is secure and protected.
            </p>
            <ul className="requirements-list">
              <li>Valid bank account number</li>
              <li>Account holder name as per bank records</li>
              <li>Select your bank from the list</li>
              <li>Choose the correct account type</li>
            </ul>
          </div>
        </div>

        <div className="form-main">
          <div className="form-header">
            <h2 className="form-title">Account Details</h2>
            <p className="form-subtitle">
              Fill in your bank account information
            </p>
          </div>

          {localError && <div className="error-message">{localError}</div>}
          {success && <div className="success-message">{success}</div>}

          <form onSubmit={handleAddAccount} className="account-form">
            <div className="form-group">
              <label htmlFor="accountType" className="form-label">
                Account Type
              </label>
              <select
                id="accountType"
                name="accountType"
                value={formData.accountType}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="" disabled>
                  Select Type
                </option>
                {accountTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="bankName" className="form-label">
                Bank Name
              </label>
              <select
                id="bankName"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="" disabled>
                  Select Bank
                </option>
                {banks.map((bank, index) => (
                  <option key={index} value={bank}>
                    {bank}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="accountHolderName" className="form-label">
                Account Holder Name
              </label>
              <input
                type="text"
                id="accountHolderName"
                name="accountHolderName"
                value={formData.accountHolderName}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="accountNumber" className="form-label">
                Account Number
              </label>
              <input
                type="text"
                id="accountNumber"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter account number"
                required
              />
            </div>

            <button type="submit" className="submit-button">
              Add Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAccountForm;
