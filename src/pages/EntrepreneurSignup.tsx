import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignupForm.css";
import {
  validateField,
  validateStep1,
  validateStep2,
} from "../utils/validation";

interface EntrepreneurSignupProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const EntrepreneurSignup: React.FC<EntrepreneurSignupProps> = ({ step, setStep }) => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    field: "",
  });

  // Error state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Handle input changes & update state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate input field & update errors
    const error = validateField(name, value, formData);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error ?? "" }));

    // Save email in sessionStorage for later use
    if (name === "email") {
      sessionStorage.setItem("userEmail", value);
    }
  };

  // Handle moving to the next step (validates step 1)
  const handleNextStep = () => {
    const step1Errors = validateStep1(formData, "entrepreneur");

    // Convert undefined values to empty strings
    const formattedErrors: { [key: string]: string } = Object.fromEntries(
      Object.entries(step1Errors).map(([key, value]) => [key, String(value ?? "")])
    );

    setErrors(formattedErrors);

    if (Object.values(formattedErrors).every((error) => error === "")) {
      setStep(2);
    }
  };

  // Handle form submission (validates step 2)
  const handleSubmit = async () => {
    const step2Errors = validateStep2(formData, "entrepreneur");

    // Convert undefined values to empty strings
    const formattedErrors: { [key: string]: string } = Object.fromEntries(
      Object.entries(step2Errors).map(([key, value]) => [key, String(value ?? "")])
    );

    setErrors(formattedErrors);

    if (Object.values(formattedErrors).every((error) => error === "")) {
      try {
        const payload = {
          SignUpFor: "Entrepreneur",
          Email: formData.email,
          Password: formData.password,
          ConfirmPassword: formData.confirmPassword,
          FullName: formData.fullName,
          Field: formData.field,
          Tracks: [],
          DeveloperSkills: [],
        };

        const response = await fetch("http://localhost:7169/api/Auth/Register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = await response.json();

          if (errorData.errors) {
            setErrors(
              Object.fromEntries(
                Object.entries(errorData.errors).map(([key, value]) => [key, String(value)])
              )
            );
          }

          throw new Error(errorData.message || "Registration failed.");
        }

        // Navigate to email verification page
        navigate("/signup/check-email");
      } catch (error: unknown) {
        if (error instanceof Error) {
          alert(`Error: ${error.message}`);
        } else {
          alert("An unexpected error occurred.");
        }
      }
    }
  };

  return (
    <div>
      {step === 1 ? (
        <div className="signup-form-container">
          <div className="signup-fields">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="error-text">{errors.email}</p>}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className="error-text">{errors.password}</p>}

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
          </div>
          <button className="next-btn" onClick={handleNextStep}>Next</button>
        </div>
      ) : (
        <div className="signup-form-container">
          <div className="signup-fields">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            {errors.fullName && <p className="error-text">{errors.fullName}</p>}

            <select
              name="field"
              value={formData.field}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Your Field</option>
              <option value="healthcare">Healthcare</option>
              <option value="finance">Finance</option>
              <option value="commerce">Commerce</option>
            </select>
            {errors.field && <p className="error-text">{errors.field}</p>}
          </div>
          <button className="create-btn" onClick={handleSubmit}>Create Account</button>
        </div>
      )}
    </div>
  );
};

export default EntrepreneurSignup;
