import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EntrepreneurSignup.css";
import StandardPage from "../components/StandardPage";

const EntrepreneurSignup: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    field: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(2);
  // const prevStep = () => setStep(1);

  return (
    <StandardPage>
      <h1>Create an Account</h1>
      <div className="step-indicator">
        <div className={`step step-1 ${step === 1 ? 'active' : ''}`} onClick={() => setStep(1)}>Email</div>
        <div className={`step step-2 ${step === 2 ? 'active' : ''}`}>Personal Info</div>
      </div>
      {step === 1 ? (
        <div className="personal-info-container">
          <div className="personal-info-fields">
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
          </div>
          <button className="next-btn" onClick={nextStep}>Next</button>
          <p className="login-text">Already have an account? <a className="link" href="/login">Login</a></p>
        </div>
      ) : (
        <div className="personal-info-container">
          <div className="personal-info-fields">
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
            <select name="field" value={formData.field} onChange={handleChange}>
              <option value="" disabled>Select Your Field</option>
              <option value="healthcare">Healthcare</option>
              <option value="finance">Finance</option>
              <option value="commerce">Commerce</option>
            </select>
          </div>
          <button className="create-btn" onClick={() => navigate("/signup/check-email")}>Create Account</button>
          <p className="terms">By signing up, you agree to our <a className="link" href="/terms">Terms and Conditions</a></p>
        </div>
      )}
    </StandardPage>
  );
};

export default EntrepreneurSignup;
