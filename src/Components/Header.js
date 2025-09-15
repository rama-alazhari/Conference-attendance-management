import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark" style={{ backgroundColor: "#ff9712" }}>
      <div className="container-fluid">
        {/* Logo */}
        <NavLink to="/" className="navbar-brand">
          <img
            src={require("../Images/20250915_112237 (1).png")}
            width={70}
            height={70}
            alt="Logo"
          />
        </NavLink>

        {/* Toggler Button for small screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <NavLink to="/settings" className="nav-link text-light fw-bold fs-4 me-3">Settings</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/profile" className="nav-link text-light fw-bold fs-4 me-3">Profile</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/dashboard-user" className="nav-link text-light fw-bold fs-4 me-3">Admin Panel</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/login">
                <button className="btn btn-dark fw-bold ms-md-3 fs-4">Login</button>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
