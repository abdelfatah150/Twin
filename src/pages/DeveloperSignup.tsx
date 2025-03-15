import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import "../styles/SignupForm.css";
import {
  validateField,
  validateStep1,
  validateStep2,
} from "../utils/validation"; // Import validation functions

interface DeveloperSignupProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const techOptions = [
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

const DeveloperSignup: React.FC<DeveloperSignupProps> = ({ step, setStep }) => {
  const navigate = useNavigate();
  
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
  

  const [errors, setErrors] = useState<{ [key: string]: string }>({}); 

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

  // Handle Multi-Select Change
  const handleMultiSelect = (selectedOptions: any) => {
    const selectedValues = selectedOptions ? selectedOptions.map((opt: any) => opt.value) : [];
    setFormData({ ...formData, technologies: selectedValues });

    const error = validateField("technologies", selectedValues, formData);
    setErrors((prevErrors) => ({ ...prevErrors, technologies: error }));
  };

  // Handle Moving to Step 2 (Validates Step 1)
  const handleNextStep = () => {
    const step1Errors = validateStep1(formData, "developer");
  
    const formattedErrors: { [key: string]: string } = {
      fullName: "",
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
  const step2Errors = validateStep2(formData, "developer");

  // Ensure all fields are properly formatted as strings
  const formattedErrors: { [key: string]: string } = {
    track: "",
    technologies: "",
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
            <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
            {errors.fullName && <p className="error-text">{errors.fullName}</p>}

            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
            {errors.email && <p className="error-text">{errors.email}</p>}

            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            {errors.password && <p className="error-text">{errors.password}</p>}

            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
            {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
          </div>
          <button className="next-btn" onClick={handleNextStep}>Next</button>
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
            {errors.track && <p className="error-text">{errors.track}</p>}

            <Select
              options={techOptions}
              isMulti
              value={techOptions.filter((option) => formData.technologies.includes(option.value))}
              onChange={handleMultiSelect}
              placeholder="Select technologies..."
              className="basic-multi-select"
              classNamePrefix="select"
            />
            {errors.technologies && <p className="error-text">{errors.technologies}</p>} 

            <input type="url" name="linkedin" placeholder="LinkedIn Profile (Optional)" value={formData.linkedin} onChange={handleChange} />
            <input type="url" name="github" placeholder="GitHub Profile (Optional)" value={formData.github} onChange={handleChange} />
          </div>
          <button className="create-btn" onClick={handleSubmit}>Create Account</button>
        </div>
      )}
    </div>
  );
};

export default DeveloperSignup;
