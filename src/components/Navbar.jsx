import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const selectedCompany = location.state?.company || "TCS"; // fallback if missing

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/dashboard" className="navbar-link">Dashboard</Link>
        </li>
        <li className="navbar-item">
          <Link to="/post-job" className="navbar-link">Post Job</Link>
        </li>
        <li className="navbar-item">
          <Link to="/manage-jobs" className="navbar-link">Manage Listings</Link>
        </li>
        <li className="navbar-item">
          <Link to="/profile" state={{ company: selectedCompany }} className="navbar-link">Profile</Link>
        </li>
        <li className="navbar-item">
          <Link to="/" className="navbar-link">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
