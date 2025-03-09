import "../styles/OnBoarding.css";

const OnBoarding3 = () => {

  const handleOnboardingComplete = () => {
    localStorage.setItem("onboardingComplete", "true"); // Mark as completed
    window.location.reload(); // Redirect to home
  };

  return (
    <div className="onboarding-container container3">
      <div className="content-box3">
        <h1 className="onboarding-title">Entrepreneurs</h1>
        <p className="description">
          Post your idea or task and get matched with a skilled developer eager to collaborate.
        </p>
        <p className="description">
          Validate your idea with expert insights at no cost before bringing it to life.
        </p>
        <p className="description">
          Work together seamlessly to turn your vision into reality.
        </p>

        <div className="button-dots-container">
          <div className="dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot active"></span>
          </div>
          <button className="learn-more" onClick={handleOnboardingComplete}>
            Start →
          </button>
        </div>
      </div>

      <div className="image-container-entrepreneurs">
        <img src="Business mission-amico.png" alt="Welcome to Twin" />
      </div>
    </div>
  );
};

export default OnBoarding3;
