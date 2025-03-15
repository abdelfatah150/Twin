import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupForm from "./pages/SignupForm";
import SignupPage from "./pages/SignupPage";
import CheckEmailPage from "./pages/CheckEmail";
import LoginPage from "./pages/LoginPage";
import ForgotPassword from "./pages/ForgotPassword";
import TestPage from "./pages/TestPage";
import LandingPage from "./pages/Landing";
import OnBoarding1 from "./pages/OnBoarding1";

const App: React.FC = () => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(false);

  useEffect(() => {
    // Check local storage when the app loads
    const completed = localStorage.getItem("onboardingComplete");
    if (completed) {
      setHasCompletedOnboarding(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={hasCompletedOnboarding ? <LandingPage /> : <OnBoarding1 />} />
        <Route path="/signup" element={<SignupPage />} />
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
