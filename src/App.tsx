import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import DeveloperSignup from "./pages/DeveloperSignup";
// import EntrepreneurSignup from "./pages/EntrepreneurSignup";
import SignupForm from "./pages/SignupForm";
import SignupPage from "./pages/SignupPage";
import CheckEmailPage from "./pages/CheckEmail"
import LoginPage from "./pages/LoginPage"
import ForgotPassword from "./pages/ForgotPassword"
import TestPage from "./pages/TestPage"
import LandingPage from "./pages/Landing"
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* <Route path="/signup/developer" element={<DeveloperSignup />} />
        <Route path="/signup/entrepreneur" element={<EntrepreneurSignup />} /> */}
        <Route path="/signup/form" element={<SignupForm />} />
        <Route path="/signup/check-email" element={<CheckEmailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
};
export default App;
