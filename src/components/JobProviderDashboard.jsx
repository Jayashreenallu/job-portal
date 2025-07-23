import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const JobProviderDashboard = () => {
  const navigate = useNavigate();
  const company = localStorage.getItem("selectedCompany");
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  useEffect(() => {
    if (!isAuthenticated || !company) {
      navigate("/");
      return;
    }
    
    // Redirect to the comprehensive profile page
    navigate("/profile");
  }, [company, isAuthenticated, navigate]);

  return null; // This component just redirects, so we don't render anything
};

export default JobProviderDashboard;
