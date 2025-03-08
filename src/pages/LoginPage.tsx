import React, { useState } from "react";
import StandardPage from "../Components/StandardPage";
import "../styles/LoginPage.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <StandardPage>
      <h1>Login</h1>
      <div className="login-form">
        <input type="email" placeholder="Email" className="input-field" />
        <div className="password-container">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            className="input-field"
          />
          <span
            className="password-toggle"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
        <button className="login-btn">Login</button>
        <p className="signup-text">
          Don't have an account? <a href="/signup" className="signup-link">Sign Up</a>
        </p>
      </div>
    </StandardPage>
  );
};

export default LoginPage;
