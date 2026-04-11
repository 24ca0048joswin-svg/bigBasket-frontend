import './AdminRegistration.css';
import {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function AdminRegistration() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState('');

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    if (email == "" && password == "" && username == "" && confirmPassword == "") {
      alert("Email, username, password and confirm password is required")
      setMsg("Email, username, password and confirm password is required");
    }
    else if (username == "") {
      alert("Username is required")
      setMsg("Username is required");
    }
    else if (email == "") {
      alert("Email is required")
      setMsg("Email is required");
    } else if (password == "") {
      alert("Password is required");
      setMsg("Password is required");
    } else if (password != confirmPassword) {
      alert("Password and Confirm password must be same");
      setMsg("Password and Confirm password must be same");
    }
    else if (confirmPassword == "") {
      alert("Confirm Password is required");
      setMsg("Confirm Password is required");
    } else {
      const res = await axios.post('http://localhost:3000/admin/register', { username, email, password });
      const data = res.data;
      if (data.status == 'success') {
        alert("Admin Registration successful");
        setMsg("Admin Registration successful");
        navigate('/adminPanel');
      } else if (data.status == 'error' && data.msg == 'User already exists') {
        alert("User already exists");
        setMsg('User already exists');
      }
      else {
        alert("An error occured");
        setMsg("An error occured");
        console.log(res);
      }
    }
  }
    return (
        <div className='center-modal'>
            {/* <div className="modal-content" onClick={(e) => e.stopPropagation()}> */}
            <div className="modal-content">
                <div className="right-panel">
                    <h2 className='center-text'>
                        Register
                    </h2>

                    <input
                        type="text"
                        placeholder="Enter Username"
                        className="input-field"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

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

                    <input
                        type="password"
                        placeholder="Enter confirm password"
                        className="input-field"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <input type="button" value="Register" className="continue-btn" onClick={handleRegister} />
                    <span className='red-text center-text'>{msg}</span>

                        <Link to="/adminPanel" className='link-cursor-text center-text'>
                            Return to Admin Dashboard
                        </Link>
                </div>

            </div>
        </div>
    );
}

export default AdminRegistration;