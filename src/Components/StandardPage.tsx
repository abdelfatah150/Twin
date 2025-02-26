import React from "react";
import "./StandardPage.css";

const StandardPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="standard-page">
      <div className="content-box">
        {children}
      </div>
    </div>
  );
};

export default StandardPage;
