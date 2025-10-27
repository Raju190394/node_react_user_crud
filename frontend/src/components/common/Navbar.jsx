import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../styles/Navbar.css';


function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>MyApp</h2>
      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/users">Users</Link>
        <Link to="/settings">Settings</Link>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
