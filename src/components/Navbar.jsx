import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const selectedCompany = location.state?.company || "TCS"; // fallback if missing

  return (
    <nav style={{ padding: '10px', backgroundColor: '#222', color: '#fff', textAlign: 'center' }}>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', justifyContent: 'center' }}>
        <li style={{ margin: '0 15px' }}>
          <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</Link>
        </li>
        <li style={{ margin: '0 15px' }}>
          <Link to="/post-job" style={{ color: '#fff', textDecoration: 'none' }}>Post Job</Link>
        </li>
        <li style={{ margin: '0 15px' }}>
          <Link to="/manage-jobs" style={{ color: '#fff', textDecoration: 'none' }}>Manage Listings</Link>
        </li>
        <li style={{ margin: '0 15px' }}>
          <Link to="/profile" state={{ company: selectedCompany }} style={{ color: '#fff', textDecoration: 'none' }}>Profile</Link>
        </li>
        <li style={{ margin: '0 15px' }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
