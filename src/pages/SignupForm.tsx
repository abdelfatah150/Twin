import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import "../styles/SignupForm.css";
import StandardPage from "../components/StandardPage";

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

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    const role = sessionStorage.getItem("userRole");
    if (!role) {
      navigate("/signup"); // Redirect if no role is selected
    } else {
      setUserRole(role);
      initializeForm(role);
    }
  }, [navigate]);

  const initializeForm = (role: string) => {
    if (role === "developer") {
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        track: "",
        technologies: [] as string[],
        linkedin: "",
        github: "",
      });
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        field: "",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMultiSelect = (selectedOptions: any) => {
    setFormData({
      ...formData,
      technologies: selectedOptions ? selectedOptions.map((opt: any) => opt.value) : [],
    });
  };

  if (!userRole) return null; // Prevent rendering before role is retrieved

  return (
    <StandardPage>
      <h1>Create an Account</h1>
      <div className="step-indicator">
        <div className={`step step-1 ${step === 1 ? "active" : ""}`} onClick={() => setStep(1)}>Personal Info</div>
        <div className={`step step-2 ${step === 2 ? "active" : ""}`}>More Details</div>
      </div>

      {step === 1 ? (
        <div className="signup-form-container">
          <div className="signup-fields">
            {userRole === "developer" ? (
                <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
                ) : (
                <>

                </>
                )}
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
            {userRole === "developer" ? (
              <>
                <select name="track" value={formData.track} onChange={handleChange}>
                  <option value="" disabled>Select Your Track</option>
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="fullstack">Full Stack</option>
                </select>

                <Select
                  options={techOptions}
                  isMulti
                  value={techOptions.filter((option) => formData.technologies.includes(option.value))}
                  onChange={handleMultiSelect}
                  placeholder="Select technologies..."
                  className="basic-multi-select"
                  classNamePrefix="select"
                />

                <input type="url" name="linkedin" placeholder="LinkedIn Profile (Optional)" value={formData.linkedin} onChange={handleChange} />
                <input type="url" name="github" placeholder="GitHub Profile (Optional)" value={formData.github} onChange={handleChange} />
              </>
            ) : (
                <>
                    <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
                    <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
                    <select name="field" value={formData.field} onChange={handleChange}>
                        <option value="" disabled>Select Your Field</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="finance">Finance</option>
                        <option value="commerce">Commerce</option>
                    </select>   
                </>

            )}
          </div>
          <button className="create-btn" onClick={() => navigate("/signup/check-email")}>Create Account</button>
          <p className="terms">By signing up, you agree to our <a className="link" href="/terms">Terms and Conditions</a></p>
        </div>
      )}
    </StandardPage>
  );
};

export default SignupForm;
