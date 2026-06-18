import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../style/AddTransactionForm.css";

const AddTransactionForm = () => {
  const { accountId } = useParams();
  const [transaction, setTransaction] = useState({
    amount: "",
    category: "Receivables",
    description: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const categories = ["Receivables", "Payables"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accountId) {
      setError("Error: Account ID is missing.");
      return;
    }

    if (
      !transaction.amount ||
      !transaction.category ||
      !transaction.description
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8090/accounts/${accountId}/transactions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            transactionDate: new Date().toISOString(),
            amount: parseFloat(transaction.amount),
            category: transaction.category,
            description: transaction.description,
          }),
        },
      );

      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(
          errorDetails.message ||
            "Failed to add transaction. Please try again.",
        );
      }

      setSuccess("Transaction added successfully!");
      setTimeout(() => {
        setTransaction({
          amount: "",
          category: "Receivables",
          description: "",
        });
        navigate(`/account-details/${accountId}`);
      }, 1500);
    } catch (error) {
      setError(error.message || "Error adding transaction. Please try again.");
    }
  };

  return (
    <div className="transaction-form-container">
      <div className="transaction-form-card">
        <div className="form-header">
          <h2 className="form-title">Add New Transaction</h2>
          <p className="form-subtitle">Enter the transaction details below</p>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="transaction-form">
          <div className="amount-group">
            <label htmlFor="amount" className="form-label">
              Amount
            </label>
            <span className="currency-symbol">₹</span>
            <input
              type="number"
              id="amount"
              name="amount"
              value={transaction.amount}
              onChange={handleChange}
              required
              className="form-input amount-input"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>

          <div className="category-group">
            <label className="form-label">Category</label>
            <div className="category-options">
              {categories.map((category) => (
                <div key={category} className="category-option">
                  <input
                    type="radio"
                    id={category}
                    name="category"
                    value={category}
                    checked={transaction.category === category}
                    onChange={handleChange}
                    className="category-radio"
                    required
                  />
                  <label htmlFor={category} className="category-label">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={transaction.description}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter transaction description"
            />
          </div>

          <button type="submit" className="submit-button">
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionForm;
