import './AdminLogin.css';
import { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    if (email == "" && password == "") {
      alert("Email and password is required")
      setMsg("Email and password is required")
    }
    else if (email == "") {
      alert("Email is required")
      setMsg("Email is required");
    } else if (password == "") {
      alert("Password is required")
      setMsg("Password is required");
    } else {
      if((email == "admin@gmail.com") && (password=="1234")){
         alert("Login successful");
         navigate('/adminPanel');
      }else{
        alert("Incorrect email or password");  
        setMsg("Incorrect email or password");       
    }
  }
}

  return (
    <>
      <div className='center-modal'>
        <div className="modal-content">
          <div className="right-panel">
            <h2 className='center-text'>
              Login
            </h2>

            <input
              type="text"
              placeholder="Enter Email Id"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input type="button" value="Login" className="continue-btn" onClick={handleLogin} />

            <span className='red-text center-text'>{msg}</span>

            {/* <span className='link-cursor-text center-text'>
              <Link to="/adminRegister">
                Don't have an account? Sign Up
              </Link>
            </span> */}
          </div>

        </div>
      </div>
    </>
  );
}

export default AdminLogin;
