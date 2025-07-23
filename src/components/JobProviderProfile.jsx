import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./JobProviderProfile.css";

const JobProviderProfile = () => {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [companyProfile, setCompanyProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    newApplications: 0
  });

  const navigate = useNavigate();
  const company = localStorage.getItem("selectedCompany") || "";
  const userEmail = localStorage.getItem("userEmail") || "";
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  useEffect(() => {
    if (!isAuthenticated || !company) {
      navigate("/");
      return;
    }
    loadProfileData();
  }, [company, isAuthenticated, navigate]);

  const loadProfileData = async () => {
    try {
      setLoading(true);
      
      // Load jobs
      const jobsRes = await fetch("http://localhost:5000/jobs");
      const jobsData = await jobsRes.json();
      const companyJobs = jobsData.filter((job) => job.company === company);
      setJobs(companyJobs);

      // Load applications
      const jobIds = companyJobs.map((job) => job.id);
      const appsRes = await fetch("http://localhost:5000/applications");
      const appsData = await appsRes.json();
      const filteredApps = appsData.filter((app) => jobIds.includes(app.jobId));
      setApplications(filteredApps);

      // Load company data
      const companiesRes = await fetch("http://localhost:5000/companies");
      const companiesData = await companiesRes.json();
      const currentCompany = companiesData.find(c => c.name === company);
      setCompanyProfile(currentCompany || {});

      // Calculate stats
      setStats({
        totalJobs: companyJobs.length,
        activeJobs: companyJobs.length, // Assuming all jobs are active
        totalApplications: filteredApps.length,
        newApplications: filteredApps.filter(app => !app.viewed).length || filteredApps.length
      });

    } catch (error) {
      console.error("Error loading profile data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Recent";
    return new Date(dateString).toLocaleDateString();
  };

  const getJobById = (jobId) => {
    return jobs.find(job => job.id === jobId);
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {/* Header Section */}
      <div className="profile-header">
        <div className="company-info">
          <div className="company-avatar">
            {company.charAt(0).toUpperCase()}
          </div>
          <div className="company-details">
            <h1>{company} Dashboard</h1>
            <p className="user-email">{userEmail}</p>
            <p className="last-login">Last login: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <h3>{stats.totalJobs}</h3>
            <p>Total Jobs Posted</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{stats.activeJobs}</h3>
            <p>Active Job Listings</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{stats.totalApplications}</h3>
            <p>Total Applications</p>
          </div>
        </div>
        <div className="stat-card highlight">
          <div className="stat-icon">🔔</div>
          <div className="stat-info">
            <h3>{stats.newApplications}</h3>
            <p>New Applications</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={`tab-btn ${activeTab === 'applications' ? 'active' : ''}`}
          onClick={() => setActiveTab('applications')}
        >
          Applications ({applications.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'jobs' ? 'active' : ''}`}
          onClick={() => setActiveTab('jobs')}
        >
          My Jobs ({jobs.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Company Profile
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard-content">
            <div className="dashboard-section">
              <h3>Recent Applications</h3>
              {applications.slice(0, 5).length === 0 ? (
                <div className="empty-state">
                  <p>No applications received yet.</p>
                  <button onClick={() => navigate("/post-job")} className="primary-btn">
                    Post Your First Job
                  </button>
                </div>
              ) : (
                <div className="recent-applications">
                  {applications.slice(0, 5).map((app) => {
                    const job = getJobById(app.jobId);
                    return (
                      <div className="application-summary" key={app.id}>
                        <div className="applicant-info">
                          <div className="applicant-avatar">
                            {app.candidateName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4>{app.candidateName}</h4>
                            <p>Applied for: {job?.title || 'Unknown Position'}</p>
                            <small>{formatDate(app.appliedDate)}</small>
                          </div>
                        </div>
                        <button className="view-btn">View</button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="dashboard-section">
              <h3>Quick Actions</h3>
              <div className="quick-actions">
                <button onClick={() => navigate("/post-job")} className="action-btn">
                  <span className="action-icon">➕</span>
                  Post New Job
                </button>
                <button onClick={() => navigate("/manage-jobs")} className="action-btn">
                  <span className="action-icon">📝</span>
                  Manage Jobs
                </button>
                <button onClick={() => setActiveTab('applications')} className="action-btn">
                  <span className="action-icon">👀</span>
                  View Applications
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="applications-content">
            <div className="section-header">
              <h3>Job Applications</h3>
              <p>Manage and review candidate applications</p>
            </div>
            
            {applications.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📭</div>
                <h4>No Applications Yet</h4>
                <p>Once candidates start applying to your jobs, their applications will appear here.</p>
                <button onClick={() => navigate("/post-job")} className="primary-btn">
                  Post a Job
                </button>
              </div>
            ) : (
              <div className="applications-list">
                {applications.map((app) => {
                  const job = getJobById(app.jobId);
                  return (
                    <div className="application-card" key={app.id}>
                      <div className="application-header">
                        <div className="applicant-details">
                          <div className="applicant-avatar large">
                            {app.candidateName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4>{app.candidateName}</h4>
                            <p className="applicant-email">{app.email}</p>
                            <span className="application-date">Applied {formatDate(app.appliedDate)}</span>
                          </div>
                        </div>
                        <div className="application-status">
                          <span className="status-badge new">New</span>
                        </div>
                      </div>
                      
                      <div className="job-info">
                        <h5>Position: {job?.title || 'Unknown Position'}</h5>
                        <p>{job?.location} • {job?.jobType} • {job?.workplaceType}</p>
                      </div>

                      <div className="application-actions">
                        <a 
                          href={app.resume} 
                          target="_blank" 
                          rel="noreferrer"
                          className="resume-btn"
                        >
                          📄 View Resume
                        </a>
                        <button className="contact-btn">
                          📧 Contact
                        </button>
                        <button className="shortlist-btn">
                          ⭐ Shortlist
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="jobs-content">
            <div className="section-header">
              <h3>My Job Listings</h3>
              <button onClick={() => navigate("/post-job")} className="primary-btn">
                + Post New Job
              </button>
            </div>

            {jobs.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">💼</div>
                <h4>No Jobs Posted Yet</h4>
                <p>Start posting jobs to attract top talent to your company.</p>
                <button onClick={() => navigate("/post-job")} className="primary-btn">
                  Post Your First Job
                </button>
              </div>
            ) : (
              <div className="jobs-grid">
                {jobs.map((job) => {
                  const jobApplications = applications.filter(app => app.jobId === job.id);
                  return (
                    <div className="job-card" key={job.id}>
                      <div className="job-header">
                        <h4>{job.title}</h4>
                        <div className="job-status">
                          <span className="status-active">Active</span>
                        </div>
                      </div>
                      
                      <div className="job-details">
                        <p><strong>Location:</strong> {job.location}</p>
                        <p><strong>Type:</strong> {job.jobType}</p>
                        <p><strong>Workplace:</strong> {job.workplaceType}</p>
                        <p className="job-requirements">{job.requirements}</p>
                      </div>

                      <div className="job-stats">
                        <span className="stat">
                          👥 {jobApplications.length} Applications
                        </span>
                        <span className="stat">
                          📅 Posted {formatDate(job.postedDate)}
                        </span>
                      </div>

                      <div className="job-actions">
                        <button 
                          onClick={() => navigate(`/edit-job/${job.id}`)}
                          className="edit-btn"
                        >
                          ✏️ Edit
                        </button>
                        <button className="view-applicants-btn">
                          👀 View Applicants ({jobApplications.length})
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="profile-content">
            <div className="section-header">
              <h3>Company Profile</h3>
              <p>Manage your company information and settings</p>
            </div>

            <div className="profile-form">
              <div className="form-section">
                <h4>Company Information</h4>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Company Name</label>
                    <input type="text" value={companyProfile.name || ''} readOnly />
                  </div>
                  <div className="form-group">
                    <label>Email Domain</label>
                    <input type="text" value={companyProfile.emailDomain || ''} readOnly />
                  </div>
                  <div className="form-group">
                    <label>Company ID</label>
                    <input type="text" value={companyProfile.id || ''} readOnly />
                  </div>
                  <div className="form-group">
                    <label>Current User</label>
                    <input type="text" value={userEmail} readOnly />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h4>Account Statistics</h4>
                <div className="stats-summary">
                  <div className="summary-item">
                    <span className="label">Total Jobs Posted:</span>
                    <span className="value">{stats.totalJobs}</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Total Applications Received:</span>
                    <span className="value">{stats.totalApplications}</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Account Created:</span>
                    <span className="value">Company Registration</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Last Activity:</span>
                    <span className="value">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobProviderProfile;
