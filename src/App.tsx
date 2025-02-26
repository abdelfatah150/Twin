import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import DeveloperSignup from "./Components/DeveloperSignup";
import EntrepreneurSignup from "./Components/EntrepreneurSignup";
import SignupPage from "./Components/SignupPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signup/developer" element={<DeveloperSignup />} />
        <Route path="/signup/entrepreneur" element={<EntrepreneurSignup />} />
      </Routes>
    </Router>
  );
};

export default App;
