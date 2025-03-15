import { useState } from "react";
import OnBoarding3 from "./OnBoarding3"; // Import the next step
import "../styles/OnBoarding.css";

const OnBoarding2 = () => {
  const [showNext, setShowNext] = useState(false); // State to switch to OnBoarding3

  return (
    <>
      {showNext ? (
        <OnBoarding3 />
      ) : (
        <div className="onboarding-container container2">
          <div className="content-box2">
            <h1 className="onboarding-title">Developers</h1>
            <p className="description">
              Choose a skill that aligns with your passion and expertise, and gain access to real-world projects tailored to your level.
            </p>
            <p className="description">
              Collaborate with entrepreneurs, work on impactful projects, and enhance your technical skills. Build a strong portfolio, gain hands-on experience, and grow your professional network.
            </p>

            <div className="button-dots-container">
              <div className="dots">
                <span className="dot"></span>
                <span className="dot active"></span>
                <span className="dot"></span>
              </div>
              <button className="learn-more" onClick={() => setShowNext(true)}>
                Learn More →
              </button>
            </div>
          </div>

          <div className="image-container-developer">
            <img src="Growing-pana.png" alt="Welcome to Twin" />
          </div>
        </div>
      )}
    </>
  );
};

export default OnBoarding2;
