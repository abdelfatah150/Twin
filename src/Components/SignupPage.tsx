import React from "react";
import "./SignupPage.css";

const SignupPage: React.FC = () => {
  return (
    <div className="signup-container">
      {/* Left Side - White Background (60%) */}
      <div className="left-section">
        <div className="signup-header">
            <h1>Welcome to Twin</h1>
            <p>Your journey starts here. Choose your sign-up option.</p>
        </div>
        <img 
          src="/assets/signup-image.jpg" 
          alt="Signup Illustration" 
          className="signup-image"
        />
      </div>

      {/* Right Side - Green Background (40%) */}
      <div className="right-section">
        <div className="signup-option developer">
          <h2>Sign up as a Developer</h2>
          <p>Tired of working on the same repetitive projects as everyone else?
          Sign up to build real-world projects that will make your portfolio stand out and enhance your resume!</p>
          <button className="signup-button">Sign Up As a Developer</button>
        </div>
        <div className="signup-option entrepreneur">
          <h2>Become an Entrepreneur</h2>
          <p>Register to become an entrepreneur and collaborate with a developer to turn your idea into reality!</p>
          <button className="signup-button">Sign Up As a Entrepreneur</button>
        </div>
      </div>
    </div>
  );
};


  
export default SignupPage;
