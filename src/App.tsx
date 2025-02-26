import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import DeveloperSignup from "./Components/DeveloperSignup";
import EntrepreneurSignup from "./Components/EntrepreneurSignup";
import SignupPage from "./Components/SignupPage";
import CheckEmailPage from "./Components/CheckEmail"
import LoginPage from "./Components/LoginPage"
import ForgotPassword from "./Components/ForgotPassword"
import TestPage from "./Components/TestPage"

import "./App.css"

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signup/developer" element={<DeveloperSignup />} />
        <Route path="/signup/entrepreneur" element={<EntrepreneurSignup />} />
        <Route path="/signup/check-email" element={<CheckEmailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
