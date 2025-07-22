import React from "react";
import "./DashboardStyles.css"; // Assuming you have a CSS file for styling

const JobProviderDashboard = () => {
  const company = localStorage.getItem("selectedCompany");

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome to {company} Dashboard</h1>
      <p className="dashboard-desc">Use the navigation above to manage your job postings.</p>
    </div>
  );
};

export default JobProviderDashboard;
