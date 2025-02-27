import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";  // Import react-select
import "../styles/DeveloperSignup.css";
import StandardPage from "../components/StandardPage";

const options = [
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "javascript", label: "JavaScript" },
  { value: "react", label: "React" },
  { value: "nodejs", label: "Node.js" },
  { value: "python", label: "Python" },
  { value: "django", label: "Django" },
  { value: "flask", label: "Flask" },
  { value: "sql", label: "SQL" },
  { value: "mongodb", label: "MongoDB" },
];

const DeveloperSignup: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    track: "",
    technologies: [] as string[],
    linkedin: "",
    github: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMultiSelect = (selectedOptions: any) => {
    setFormData({
      ...formData,
      technologies: selectedOptions ? selectedOptions.map((opt: any) => opt.value) : [],
    });
  };

  return (
    <StandardPage>
      <h1>Create an Account</h1>
      <div className="step-indicator">
        <div className={`step step-1 ${step === 1 ? "active" : ""}`} onClick={() => setStep(1)}>Personal Info</div>
        <div className={`step step-2 ${step === 2 ? "active" : ""}`}>Tech Details</div>
      </div>

      {step === 1 ? (
        <div className="signup-form-container">
          <div className="signup-fields">
            <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
          </div>
          <button className="next-btn" onClick={() => setStep(2)}>Next</button>
          <p className="login-text">Already have an account? <a className="link" href="/login">Login</a></p>
        </div>
      ) : (
        <div className="signup-form-container">
          <div className="signup-fields">
            <select name="track" value={formData.track} onChange={handleChange}>
              <option value="" disabled>Select Your Track</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="fullstack">Full Stack</option>
            </select>

            <Select
              options={options}
              isMulti
              value={options.filter((option) => formData.technologies.includes(option.value))}
              onChange={handleMultiSelect}
              placeholder="Select technologies..."
              className="basic-multi-select"
              classNamePrefix="select"
            />

            <input type="url" name="linkedin" placeholder="LinkedIn Profile (Optional)" value={formData.linkedin} onChange={handleChange} />
            <input type="url" name="github" placeholder="GitHub Profile (Optional)" value={formData.github} onChange={handleChange} />
          </div>
          <button className="create-btn" onClick={() => navigate("/signup/check-email")}>Create Account</button>
          <p className="terms">By signing up, you agree to our <a className="link" href="/terms">Terms and Conditions</a></p>
        </div>
      )}
    </StandardPage>
  );
};

export default DeveloperSignup;
