import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StandardPage from "../components/StandardPage";
import "../styles/CheckEmail.css";

const CheckEmailPage: React.FC = () => {
  const navigate = useNavigate();
  const [email] = useState("youremail@example.com"); // Replace with actual email
  const [code, setCode] = useState(["", "", "", ""]);
  const [isVerified, setIsVerified] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);


    // Retrieve user role from sessionStorage on mount
    useEffect(() => {
      const role = sessionStorage.getItem("userRole");
      setUserRole(role);
    }, []);
  
    // Handle navigation based on role
    const handleContinue = () => {
      if (userRole === "developer") {
        navigate("/test");
      } else {
        navigate("/login");
      }
    };
  

  const handleChange = (index: number, value: string) => {
    if (value.match(/^[0-9]$/)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
    }
  };

  const handleVerify = () => {
    setIsVerified(true);
  };

  return (
    <StandardPage>
      {isVerified ? (
        <div className="verification-success">
          <h1>Congratulations!</h1>
          <p className="email-text">Your email has been verified.</p>
          <div className="checkmark">✔</div>
          <button className="login-btn" onClick={() => handleContinue()}>
            {userRole === "developer" ? "Start Your Developer Test" : "Go to Login"}
          </button>
        </div>
      ) : (
        <>
          <h1>Please check your email</h1>
          <p className="email-text">We have sent an email to <span className="email-highlight">{email}</span></p>
          <div className="code-input-container">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                className="code-box"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
              />
            ))}
          </div>
          <button className="verify-btn" onClick={handleVerify}>Verify</button>
        </>
      )}
    </StandardPage>
  );
};

export default CheckEmailPage;
