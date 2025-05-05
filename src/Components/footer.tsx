import React from 'react';
import '../styles/footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer-home">
      <div className="footer-home-content">
        <div className="footer-home-left">
          <h2 className="footer-home-left-logo">Twin</h2>
          <p className='footer-home-left-p'>© 2025 Twin. All rights reserved.</p>
        </div>
        <div className="footer-home-middle">
          <hr className="footer-home-line" />
        </div>
        <div className="footer-home-right">
          <div className="social-icons">
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
          <p className="terms-home">
            <a href="#">Terms &amp; Conditions</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
