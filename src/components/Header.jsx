import { useState, useEffect } from 'react';
import logo from '../assets/logo.jpg';
import smartBasket from '../assets/smart-basket.webp';
import basket from '../assets/basket.png';
import './Header.css';
import Login from './Login.jsx';
import { Link } from 'react-router-dom';

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function onClickLogin() {
    setShowLogin(true);
  }

  function logout() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    alert("You have logged out from your account!");
  }
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  return (
    <header className="bigbasket-header">
      <div className="top-bar-">
        <div className="container">
          <div className="top-left">
            <div className="logo-wrapper">
              <Link to="/">
                <img src={logo} alt="logo" height="56px" />
              </Link>
            </div>

            <div className="search-wrapper">
              <div className="search-icon">🔍</div>
              <input
                type="text"
                placeholder="Search for Products..."
                className="search-input"
              />
            </div>
          </div>

          <div className="top-right">
            <div className="delivery-tag">
              <span className="delivery-tag-color">Delivery in 10 mins</span><br /><span>Select Location</span>
            </div>

            {
              isLoggedIn ?
                <button className="login-btn" onClick={logout}>
                  Logout
                </button>
                :
                <button className="login-btn" onClick={onClickLogin}>
                  Login / Sign Up
                </button>
            }

           {/* <Link to="/addToCart">
              <img src={basket} alt="smart basket" height="36px" />
            </Link> */}

           { isLoggedIn && <Link to="/addToCart">
              <img src={basket} alt="smart basket" height="36px" />
            </Link> }
          </div>
        </div>
      </div>

      <nav className="category-bar">
        <div className="container">
          <button className="shop-by-category">
            Shop by Category <span className="dropdown">▼</span>
          </button>

          <div className="category-links">
            <Link to="/exoticfruits" className='category-link'>Exotic Fruits</Link>
            <Link to="/tea" className='category-link'>Tea</Link>
            <Link to="/ghee" className='category-link'>Ghee</Link>
            <Link to="/nandini" className='category-link'>Nandini</Link>
            <Link to="/freshvegetables" className='category-link'>Fresh Vegetables</Link>
            <span className="more">&#x3e;&#x3e;&#x3e; </span>
          </div>

          <div>
            <img src={smartBasket} alt="smart basket" />
          </div>
        </div>

        <div>
          {showLogin && <Login onClose={() => setShowLogin(false)} setLogin={setIsLoggedIn} />}
        </div>
      </nav>
    </header>
  );
}
