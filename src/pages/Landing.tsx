import React from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/Landing.css';
const Landing: React.FC = () => {
  const navigate = useNavigate(); // استخدام navigate

  const handleSignupClick = () => {
    navigate("/signup"); // التوجيه إلى صفحة التسجيل
  }
  return (
    <>
    <section id="landing">
      <nav>
        <div className="logo abril-fatface-regular">Twin</div>
        <div className="nav-links">
          <a href="#landing">HOME</a>
          <a href="#about-us">ABOUT US</a>
          <a href="#how-it-works">HOW IT WORKS</a>
          <a href="#our-vision">OUR VISION</a>
        </div>
        <div className="login"> <a href="/login">LOGIN</a></div>
      </nav>
      <div className='content'>
        <div className='landing-info'>
          <p className='header'>Your Ideas, Our Expertise Together We Create!</p>
          <p className='des'>
            Join a community of innovators and developers and turn your ideas into reality.
            Whether you're a visionary with a project or a developer seeking hands-on experience,
            Twin is your platform for growth and collaboration.
          </p>
          <button onClick={handleSignupClick} className="signup-btn">Sign Up Now</button>
        </div>
        <div className='image'>
          <img src='public\assets\landing.png' alt="Landing Illustration" />
        </div>
      </div>
    </section>

    <section id="about-us">
      <div className='about-us-title'>
        <div className='lines'>
        <div className='line-1'></div>
        <div className='line-2'></div>
        </div>
        <h1>ABOUT US</h1>
        <div className='lines'>
        <div className='line-1'></div>
        <div className='line-2'></div>
        </div>
      </div>
      <div className='about-us'>
      <p>At Twin, we believe in the power of collaboration. Our platform connects innovative thinkers,
      entrepreneurs, and small business owners with talented developers who are eager to gain hands-on experience by working on real projects.</p>
      </div>
      <div className='about-info'>
        <div className='info'>
          <p>Entrepreneurs</p>
          <p>It’s a cost-effective way to turn creative ideas into reality</p>
        </div>
        <div className='info'>
          <p>Developers</p>
          <p> It’s a chance to workon impactful projectsthat open doors to future opportunities</p>
        </div>

      </div>
    </section>
    <section id="how-it-works">
      <div className='about-us-title'>
        <div className='lines'>
        <div className='line-1'></div>
        <div className='line-2'></div>
        </div>
        <h1>HOW IT WORKS</h1>
        <div className='lines'>
        <div className='line-1'></div>
        <div className='line-2'></div>
        </div>
      </div>
      <div className='steps'>
        <div className='step-work'>
        <img src='assets/post.png' alt="post Illustration" />
        <h3>Post Your Project</h3>
        <p>Submit your project with details</p>
        </div>
        <div className='step-highlite'>
        <img src='assets/management.png' alt="classification Illustration" />
        <h3>Automatic Classification</h3>
        <p>Our system classifies your project based on required skills</p>
        </div>
        <div className='step-work'>
        <img src='assets/match.png' alt="match Illustration" />
        <h3>Developer Matchmaking</h3>
        <p>We match your project with the right developers</p>
        </div>
      </div>
      <div className='steps'>
        <div className='step-highlite'>
        <img src='assets/notify.png' alt="classification Illustration" />
        <h3>Email Notification</h3>
        <p>The first developer is notified; if they accept, the project starts. If not, the next is notified</p>
        </div>
        <div className='step-highlite'>
        <img src='assets/deal.png' alt="classification Illustration" />
        <h3>Collaboration Begins</h3>
        <p>Once accepted the project kicks off!</p>
        </div>
        </div>
    </section>
    <section id="our-vision">
      <div className='about-us-title'>
        <div className='lines'>
        <div className='line-1'></div>
        <div className='line-2'></div>
        </div>
        <h1>OUR VISION</h1>
        <div className='lines'>
        <div className='line-1'></div>
        <div className='line-2'></div>
        </div>
      </div>
      <div className='steps'>
        <div className='card'>
          <h3>Innovation</h3>
          <p>We believe every idea deserves a chance to shine. At Twin, we foster innovation by connecting entrepreneurs and developers to turn concepts into impactful solutions</p>
        </div>
        <div className='card color primary-color'>
          <h3> Collaboration</h3>
          <p>Success is a team effort. Our platform is built to create meaningful partnerships, helping both developers and entrepreneurs grow together</p>
        </div>
        <div className='card'>
          <h3>Growth</h3>
          <p>At Twin, we create opportunities for personal and professional growth, helping developers build portfolios and entrepreneurs achieve their dreams</p>
        </div>
      </div>
      </section>
      <section id='footer'>
          <div className='fo'>
          <div className='footer-info'>
            <h3 className=''>Twin</h3>
            <a href="#how-it-works">HOW IT WORKS</a>
            <a href="#about-us">ABOUT US</a>
          </div>
          <div className='social'>
          <a href="#signup" className="btn">Sign Up </a>
          <div className='social-icons'>
            <p>Follow Us</p>
            <a href="https://instagram.com" target="_blank">
            <img src='assets/instagram (2) 1.png' alt='i-icon'/>
            </a>
            <a href="https://facebook.com" target="_blank">
            <img src='assets/facebook (2) 1.png' alt='f-icon'/>
            </a>
            <a href="https://linkedin.com" target="_blank">
            <img src='assets/linkedin (2) 1.png' alt='l-icon'/>
            </a>
          </div>
          </div>
          </div>
          <div className='space'></div>
          <div className='terms-and-conditions'>
          <div className='copy-right'><p>© 2025 Twin. All rights reserved.</p></div>
          <div className='copy-right'><p>Terms & Conditions</p></div>
          </div>
          

      </section>
    </>
  );
};

export default Landing;