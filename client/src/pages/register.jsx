import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import "../style/Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8090/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessageType("success");
        setMessage(data.message || "Registration successful!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setMessageType("error");
        setMessage(data.error || "Registration failed");
      }
    } catch (error) {
      setMessageType("error");
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Navigation />
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <div className="register-logo">Open</div>
            <h1 className="register-title">Create your account</h1>
            <p className="register-subtitle">
              Join thousands of businesses managing their finances with Open
            </p>
          </div>

          {message && (
            <div
              className={
                messageType === "success" ? "success-message" : "error-message"
              }
            >
              {message}
            </div>
          )}

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                className="form-input"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="form-input"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="password-requirements">
                Password requirements:
                <ul>
                  <li>At least 8 characters long</li>
                  <li>Must contain at least one number</li>
                  <li>Must contain at least one special character</li>
                </ul>
              </div>
            </div>

            <button type="submit" className="register-button">
              Create Account
            </button>

            <button
              type="button"
              className="login-button"
              onClick={() => navigate("/login")}
            >
              Sign In Instead
            </button>
          </form>

          <div className="register-footer">
            <p>
              By creating an account, you agree to our{" "}
              <Link to="/terms">Terms of Service</Link> and{" "}
              <Link to="/privacy">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
