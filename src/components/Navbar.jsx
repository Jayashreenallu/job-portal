import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedCompany = localStorage.getItem("selectedCompany");
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  // Don't show navbar on login page
  if (location.pathname === '/') {
    return null;
  }

  // Check authentication
  if (!isAuthenticated || !selectedCompany) {
    return null;
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/dashboard" className="brand-link">
            <div className="brand-icon">🏢</div>
            <div className="brand-text">
              <span className="brand-name">CareerCrafter</span>
              <span className="brand-subtitle">Job Provider Portal</span>
            </div>
          </Link>
        </div>

        <div className="navbar-menu">
          <Link 
            to="/dashboard" 
            className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
          >
            <span className="nav-icon">📊</span>
            <span>Dashboard</span>
          </Link>
          
          <Link 
            to="/post-job" 
            className={`nav-link ${isActive('/post-job') ? 'active' : ''}`}
          >
            <span className="nav-icon">➕</span>
            <span>Post Job</span>
          </Link>
          
          <Link 
            to="/manage-jobs" 
            className={`nav-link ${isActive('/manage-jobs') ? 'active' : ''}`}
          >
            <span className="nav-icon">📝</span>
            <span>Manage Jobs</span>
          </Link>
          
          <Link 
            to="/profile" 
            className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
          >
            <span className="nav-icon">👤</span>
            <span>Profile</span>
          </Link>
        </div>

        <div className="navbar-user">
          <div className="user-info">
            <div className="user-avatar">
              {selectedCompany?.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <span className="user-company">{selectedCompany}</span>
              <span className="user-role">Job Provider</span>
            </div>
          </div>
          
          <button onClick={handleLogout} className="logout-button">
            <span className="logout-icon">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
