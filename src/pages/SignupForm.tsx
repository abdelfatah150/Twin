import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StandardPage from "../components/StandardPage";
import DeveloperSignup from "./DeveloperSignup";
import EntrepreneurSignup from "./EntrepreneurSignup";
import "../styles/SignupPage.css";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const role = sessionStorage.getItem("userRole");
    if (!role) {
      navigate("/signup");
    } else {
      setUserRole(role);
    }
  }, [navigate]);

  if (!userRole) return null;

  return (
    <StandardPage>
      <h1>Create an Account</h1>
      <div className="step-indicator">
        <div className={`step step-1 ${step === 1 ? "active" : ""}`} onClick={() => setStep(1)}>Personal Info</div>
        <div className={`step step-2 ${step === 2 ? "active" : ""}`}>More Details</div>
      </div>

      {userRole === "developer" ? <DeveloperSignup step={step} setStep={setStep} /> : <EntrepreneurSignup step={step} setStep={setStep} />}
    </StandardPage>
  );
};

export default Signup;
