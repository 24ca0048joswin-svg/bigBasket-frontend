import './Footer.css';
import getItOnPlayStore from '../assets/get-it-on-playstore.png';
import downloadAppStore from '../assets/download-app-store.svg';

export default function Footer() {
  return (
    <footer className="bigbasket-footer">
      <div className="footer-container">

        <div className="footer-column">
          <h3>Bigbasket</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">In News</a></li>
            <li><a href="#">Green bigbasket</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Affiliate</a></li>
            <li><a href="#">Terms and Conditions</a></li>
            <li><a href="#">bb Daily</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Help</h3>
          <ul>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">bb Wallet FAQs</a></li>
            <li><a href="#">bb Wallet T&Cs</a></li>
            <li><a href="#">Vendor Connect</a></li>
          </ul>
        </div>

        <div className="footer-column right-column">
          <div className="footer-logo">
            <span className="logo-text">bigbasket</span>
            <span className="tata">A TATA Enterprise</span>
          </div>

          <div className="app-badges">
            <a href="#" className="app-badge">
              <img
                src={downloadAppStore}
                alt="Download on the App Store"
              />
            </a>
            <a href="#" className="app-badge">
              <img
                src={getItOnPlayStore}
                alt="Get it on Google Play"
              />
            </a>
          </div>

          <div className="social-icons">
            <a href="#" className="social-link">f</a>
            <a href="#" className="social-link">i</a>
            <a href="#" className="social-link">t</a>
            <a href="#" className="social-link">p</a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="footer-container">
          <p>© Copyright 2025 bigbasket - All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
