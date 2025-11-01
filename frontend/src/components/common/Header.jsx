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
    <header className="app-header d-flex justify-content-between align-items-center px-4 py-2 shadow-sm">
    <div className="d-flex align-items-center">
      <h2 className="app-title mb-0">MyApp Dashboard</h2>
    </div>

    <div className="d-flex align-items-center gap-3">
      <Link to="/" className="profile-link text-white text-decoration-none fw-semibold">
        <i className="bi bi-person-circle me-1"></i> Profile
      </Link>
      <button className="btn btn-light btn-sm px-3 fw-semibold logout-btn" onClick={handleLogout}>
        <i className="bi bi-box-arrow-right me-1"></i> Logout
      </button>
    </div>
  </header>

  );
}

export default Header;
