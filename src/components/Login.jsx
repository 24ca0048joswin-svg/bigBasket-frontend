import { useState } from 'react';
import quality from '../assets/quality.png'
import onTime from '../assets/on-time.png'
import returnPolicy from '../assets/return-policy.png'
import freeDelivery from '../assets/free-delivery.png'
import playstore from '../assets/playstore.svg'
import appstore from '../assets/app-store.svg'
import LoginForm from './LoginForm.jsx';
import './Login.css';
import SignUp from './Signup.jsx';
import { Link } from 'react-router-dom';

function Login({ onClose, setLogin }) {
  const [isLogin, setIsLogin] = useState(true);

  function onHandleLogin() {
    isLogin ? setIsLogin(false) : setIsLogin(true);
  }

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={onClose}>×</button>

          <div className="modal-split">
            <div className="left-panel">
              <h2 className="why-title">Why choose Bigbasket?</h2>

              <div className="features-grid">
                <div className="feature-item">
                  <img
                    src={quality}
                    alt="quality"
                    className="app-icon"
                  />
                  <span>Quality</span>
                </div>
                <div className="feature-item">
                  <img
                    src={onTime}
                    alt="onTime"
                    className="app-icon"
                  />
                  <span>On time</span>
                </div>
                <div className="feature-item">
                  <img
                    src={returnPolicy}
                    alt="onTime"
                    className="app-icon"
                  />
                  <span>Return Policy</span>
                </div>
                <div className="feature-item">
                  <img
                    src={freeDelivery}
                    alt="onTime"
                    className="app-icon"
                  />
                  <span>Free Delivery</span>
                </div>
              </div>

              <hr className="divider" />

              <div className="app-section">
                <p>Find us on</p>
                <div className="app-icons">
                  <img
                    src={playstore}
                    alt="Google Play"
                    className="app-icon-border"
                  />
                  <img
                    src={appstore}
                    alt="App Store"
                    className="app-icon-border"
                  />
                </div>
              </div>

            </div>

            <div className="right-panel">
              <h2>
                {isLogin ?
                  "Login" :
                  "Sign Up"
                }
              </h2>


              {isLogin ? (
                <LoginForm onClose={() => onClose(false)} setLogin={setLogin} />
              ) :
                (
                  <SignUp state={setIsLogin} />
                )
              }

              <span onClick={onHandleLogin} className='link-cursor-text'>{isLogin ?
                "Don't have an account? Sign Up" :
                "Already have an account? Login"
              }</span>


              <br></br>
              <br></br>
              <br></br>
              <Link to="/adminLogin" className='link-margin white-text'>Go to admin panel</Link>

              {/* <p className="terms">
              By continuing, I accept bigbasket's{' '}
              <a href="#">Terms and Conditions</a> &{' '}
              <a href="#">Privacy Policy</a>
              This site is protected by reCAPTCHA and the Google{' '}
              <a href="#">Privacy Policy</a> and{' '}
              <a href="#">Terms of Service</a> apply.
            </p>  */}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Login
