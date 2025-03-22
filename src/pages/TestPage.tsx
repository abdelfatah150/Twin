import React from "react";
import StandardPage from "../Components/StandardPage";
import "../styles/TestPage.css";

const TestPage: React.FC = () => {
  return (
    <StandardPage>
      <div className="test-page">
        <div className="test-container">
          <div className="left-column">
            <h2>Backend</h2>
            <p>Questions: 45</p>
            <button className="start-btn">Start Now</button>
          </div>
          <div className="right-column">
            <h1>Developer Skill Assessment - Determine Your Level</h1>
            <ul>
              <li>Django - 15 Questions</li>
              <li>OOP - 15 Questions</li>
              <li>Data Structure - 15 Questions</li>
            </ul>
          </div>
        </div>
      </div>
    </StandardPage>
  );
};

export default TestPage;
