import { useState } from 'react';
import './Login.css';
import axios from 'axios';

function LoginForm({ onClose, setLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

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
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/user/login`, { email, password });
      const data = res.data;
      if (data.status == 'success') {
        setLogin(true);
        localStorage.setItem('token', data.token);
        alert("Login successful");
        setMsg("Login successful");
        onClose();
      } else if (data.msg == "Incorrect email or password" && data.status == 'error') {
        alert("Incorrect email or password");
        setMsg("Incorrect email or password");
      } else {
        alert("An error occured");
        setMsg("An error occured");
        console.log(res);
      }
    }
  }

  return (
    <>
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
    </>
  )
}

export default LoginForm
