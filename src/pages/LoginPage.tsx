import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StandardPage from "../Components/StandardPage";
import "../styles/LoginPage.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (Sends Login Request)
  const handleLogin = async () => {
    try {
      const response = await fetch("https://localhost:7169/api/Auth/LogIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        let errorMessage = "Login failed.\n";

        // Handle errors from backend
        if (Array.isArray(responseData)) {
          errorMessage += responseData.map((err) => `- ${err.description}`).join("\n");
        } else if (responseData.errors) {
          errorMessage += Object.entries(responseData.errors)
            .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(" ") : value}`)
            .join("\n");
        } else if (responseData.message) {
          errorMessage += responseData.message;
        }

        alert(errorMessage);
        return;
      }

      if (responseData.token) {
        sessionStorage.setItem("authToken", responseData.token);
      }

      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <StandardPage>
      <h1>Login</h1>
      <div className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input-field"
          value={formData.email}
          onChange={handleChange}
        />

        <div className="password-container">
          <input
            type={passwordVisible ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="input-field"
            value={formData.password}
            onChange={handleChange}
          />
          <span
            className="password-toggle"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
        <button className="login-btn" onClick={handleLogin}>Login</button>
        <p className="signup-text">
          Don't have an account? <a href="/signup" className="signup-link">Sign Up</a>
        </p>
      </div>
    </StandardPage>
  );
};

export default LoginPage;
