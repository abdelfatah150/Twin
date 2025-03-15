import { useState } from "react";
import OnBoarding2 from "./OnBoarding2";
import "../styles/OnBoarding.css";

const OnBoarding1 = () => {
  const [showNext, setShowNext] = useState(false);

  return (
    <>
      {showNext ? (
        <OnBoarding2 />
      ) : (
        <div className="onboarding-container container1">
          <div className="content-box1">
            <h1 className="onboarding-title">Welcome to Twin</h1>
            <p className="description">
              Twin is a collaborative platform designed to bridge the gap between entrepreneurs and aspiring developers.
            </p>
            <p className="description">
              Entrepreneurs who lack technical expertise can post their ideas or tasks, while developers, even those with little or no experience, can pick up these projects.
            </p>
            <div className="button-dots-container">
              <div className="dots">
                <span className="dot active"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
              <button className="learn-more" onClick={() => setShowNext(true)}>
                Learn More →
              </button>
            </div>
          </div>
          <div className="image-container-welcome">
            <img src="Live collaboration-amico.png" alt="Welcome to Twin" />
          </div>
        </div>
      )}
    </>
  );
};

export default OnBoarding1;
