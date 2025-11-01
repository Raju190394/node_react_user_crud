// src/components/common/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar d-flex flex-column p-3 shadow-sm">
      <h4 className="sidebar-title mb-4 text-center text-light">MyApp</h4>
      <nav className="nav flex-column">
        <NavLink to="/" end className="nav-link">
          <i className="bi bi-speedometer2 me-2"></i> Dashboard
        </NavLink>
        <NavLink to="/users" className="nav-link">
          <i className="bi bi-people me-2"></i> Users
        </NavLink>
        <NavLink to="/staffs" className="nav-link">
          <i className="bi bi-person-badge me-2"></i> Staffs
        </NavLink>
        <NavLink to="/reports" className="nav-link">
          <i className="bi bi-bar-chart-line me-2"></i> Reports
        </NavLink>
        <NavLink to="/settings" className="nav-link">
          <i className="bi bi-gear me-2"></i> Settings
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
