import "./AdminNav.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function AdminNav() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("adminToken");
    alert("You have logged out from your account!");
    navigate("/adminLogin");
  }

  function addAdmin() {
    navigate("/adminRegister");
  }
  return (
    <>
      <nav className="nav">
        <h1>
          <Link
            to="/adminPanel"
            className="link-margin"
            style={{ color: "white" }}
          >
            Admin DashBoard
          </Link>
        </h1>
        <div className="nav-btn-div">
          <button className="nav-btn" onClick={addAdmin}>
            Add Admin
          </button>
          <button className="nav-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}

export default AdminNav;
