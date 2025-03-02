import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignupForm.css";
import {
  validateField,
  validateStep1,
  validateStep2,
} from "../utils/validation"; // Import validation functions

interface EntrepreneurSignupProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const EntrepreneurSignup: React.FC<EntrepreneurSignupProps> = ({ step, setStep }) => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    field: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Track validation errors

  // Handle Input Change & Validate Field Individually
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const error = validateField(name, value, formData);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));

    if (name === "email") {
      sessionStorage.setItem("userEmail", value); // Save email to session storage
    }
  };

  // Handle Moving to Step 2 (Validates Step 1)
  const handleNextStep = () => {
    const step1Errors = validateStep1(formData, "entrepreneur");

    // Ensure every field exists with a default empty string
    const formattedErrors: { [key: string]: string } = {
      email: "",
      password: "",
      confirmPassword: "",
      ...step1Errors, // Override with actual validation results
    };

    setErrors(formattedErrors);

    if (Object.values(formattedErrors).every((error) => error === "")) {
      setStep(2);
    }
  };

  // Handle Form Submission (Validates Step 2)
  const handleSubmit = () => {
    const step2Errors = validateStep2(formData, "entrepreneur");

    // Ensure all fields are properly formatted as strings
    const formattedErrors: { [key: string]: string } = {
      field: "",
      ...step2Errors, // Override with actual validation results
    };

    setErrors(formattedErrors);

    if (Object.values(formattedErrors).every((error) => error === "")) {
      navigate("/signup/check-email");
    }
  };

  return (
    <div>
      {step === 1 ? (
        <div className="signup-form-container">
          <div className="signup-fields">
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
            {errors.email && <p className="error-text">{errors.email}</p>}

            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            {errors.password && <p className="error-text">{errors.password}</p>}

            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
            {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
          </div>
          <button className="next-btn" onClick={handleNextStep}>Next</button>
          <p className="login-text">Already have an account? <a className="link" href="/login">Login</a></p>
        </div>
      ) : (
        <div className="signup-form-container">
          <div className="signup-fields">
            <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
            {errors.fullName && <p className="error-text">{errors.fullName}</p>}

            <select name="field" value={formData.field} onChange={handleChange}>
              <option value="" disabled>Select Your Field</option>
              <option value="healthcare">Healthcare</option>
              <option value="finance">Finance</option>
              <option value="commerce">Commerce</option>
            </select>
            {errors.field && <p className="error-text">{errors.field}</p>}
          </div>
          <button className="create-btn" onClick={handleSubmit}>Create Account</button>
          <p className="terms">By signing up, you agree to our <a className="link" href="/terms">Terms and Conditions</a></p>
        </div>
      )}
    </div>
  );
};

export default EntrepreneurSignup;
