import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import DeveloperSignup from "./Components/DeveloperSignup";
import EntrepreneurSignup from "./Components/EntrepreneurSignup";
import SignupPage from "./Components/SignupPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/developer-signup" element={<DeveloperSignup />} />
        <Route path="/entrepreneur-signup" element={<EntrepreneurSignup />} />
      </Routes>
    </Router>
  );
};

export default App;
