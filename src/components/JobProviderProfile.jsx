import React, { useEffect, useState } from "react";
import "./DashboardStyles.css";

const JobProviderProfile = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const company = localStorage.getItem("selectedCompany") || "";

  useEffect(() => {
    const loadData = async () => {
      try {
        const jobsRes = await fetch("http://localhost:5000/jobs");
        const jobsData = await jobsRes.json();

        const companyJobs = jobsData.filter((job) => job.company === company);
        const jobIds = companyJobs.map((job) => job.id);

        const appsRes = await fetch("http://localhost:5000/applications");
        const appsData = await appsRes.json();

        const filteredApps = appsData.filter((app) => jobIds.includes(app.jobId));
        setApplications(filteredApps);
      } catch (error) {
        console.error("Error loading applications:", error);
      } finally {
        setLoading(false);
      }
    };

    if (company) {
      loadData();
    } else {
      setLoading(false);
    }
  }, [company]);

  return (
    <div className="profile-page">
      <h2 className="profile-title">{company} – Job Applications</h2>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : applications.length === 0 ? (
        <p className="no-data">No applications received yet.</p>
      ) : (
        <div className="application-list">
          {applications.map((app) => (
            <div className="application-card" key={app.id}>
              <p><strong>Candidate Name:</strong> {app.candidateName}</p>
              <p><strong>Email:</strong> {app.email}</p>
              <p>
                <strong>Resume:</strong>{" "}
                <a href={app.resume} target="_blank" rel="noreferrer">
                  View Resume
                </a>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobProviderProfile;
