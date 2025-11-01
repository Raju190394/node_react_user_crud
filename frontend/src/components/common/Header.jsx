// src/components/common/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Header.css";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-left">
        <h2 className="app-title">MyApp Dashboard</h2>
      </div>
      <div className="header-right">
        <Link to="/">Profile</Link>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
