import React, { useState } from "react";
import "./EntrepreneurSignup.css";

const EntrepreneurSignup: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    track: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

  return (
    <div className="entrepreneur-signup">
      <div className="signup-box">
        <h1>Create an Account</h1>
        <div className="step-indicator">
        <div className={`step step-1 ${step === 1 ? 'active' : ''}`} onClick={() => setStep(1)}>Email</div>
        <div className={`step step-2 ${step === 2 ? 'active' : ''}`}>Personal Info</div>
        </div>
        {step === 1 ? (
          <div className="personal-info-container">
            <div className="personal-info-fields">
              <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
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
              <select name="track" value={formData.track} onChange={handleChange}>
                <option value="" disabled>Select Your Track</option>
                <option value="web-development">Web Development</option>
                <option value="data-science">Data Science</option>
                <option value="mobile-development">Mobile Development</option>
              </select>
            </div>
            <button className="create-btn">Create Account</button>
            <p className="terms">By signing up, you agree to our <a className="link" href="/terms">Terms and Conditions</a></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EntrepreneurSignup;
