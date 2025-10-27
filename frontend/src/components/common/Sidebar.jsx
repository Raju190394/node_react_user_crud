// src/components/common/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <NavLink to="/" end>
        Dashboard
        </NavLink>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/staff"> Staffs</NavLink>
        <NavLink to="/reports">Reports</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
