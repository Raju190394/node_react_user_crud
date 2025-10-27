// src/components/common/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <h2 className="app-title">MyApp Dashboard</h2>
      </div>
      <div className="navbar-right">
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
        <Link to="/settings">Settings</Link>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
