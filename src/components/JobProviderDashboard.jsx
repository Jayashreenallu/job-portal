import React from "react";

const JobProviderDashboard = () => {
  const company = localStorage.getItem("selectedCompany");

  return (
    <div className="page-container">
      <h1>Welcome to {company} Dashboard</h1>
      <p>Use the navigation above to manage your job postings.</p>
    </div>
  );
};

export default JobProviderDashboard;
