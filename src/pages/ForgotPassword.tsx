import React, { useEffect, useState } from "react";
import StandardPage from "../components/StandardPage";
import "../styles/ForgotPassword.css"

const ForgotPassword: React.FC = () => {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const savedRole = sessionStorage.getItem("userRole"); // Retrieve the saved role
    setUserRole(savedRole);
   }, []);

  return (
    <StandardPage>
      <h1>Forgot Password?</h1>
      <h2> {userRole ? userRole : "Guest"}</h2>
    </StandardPage>
  );
};

export default ForgotPassword;
