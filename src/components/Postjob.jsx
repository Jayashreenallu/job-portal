import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PostJob.css";

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    workplaceType: "",
    location: "",
    jobType: "",
    requirements: "",
    description: "",
    salary: "",
    experience: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();
  const company = localStorage.getItem("selectedCompany");
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  useEffect(() => {
    if (!isAuthenticated || !company) {
      navigate("/");
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      company: company
    }));
  }, [company, isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (error) setError("");
  };

  const validateForm = () => {
    const required = ['title', 'workplaceType', 'location', 'jobType', 'requirements'];
    
    for (let field of required) {
      if (!formData[field].trim()) {
        setError(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
        return false;
      }
    }
    
    if (formData.requirements.length < 10) {
      setError("Requirements should be at least 10 characters long");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const jobData = {
        ...formData,
        id: Date.now().toString(), // Simple ID generation
        postedDate: new Date().toISOString(),
        status: "active",
        company: company
      };
      
      const response = await fetch("http://localhost:5000/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(jobData)
      });
      
      if (!response.ok) {
        throw new Error("Failed to post job");
      }
      
      setSuccess(true);
      
      // Reset form
      setFormData({
        title: "",
        company: company,
        workplaceType: "",
        location: "",
        jobType: "",
        requirements: "",
        description: "",
        salary: "",
        experience: ""
      });
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
      
    } catch (error) {
      console.error("Error posting job:", error);
      setError("Failed to post job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="post-job-container">
        <div className="success-message">
          <div className="success-icon">✅</div>
          <h2>Job Posted Successfully!</h2>
          <p>Your job listing has been created and is now live.</p>
          <p>Redirecting to your profile...</p>
          <div className="success-actions">
            <button onClick={() => navigate("/profile")} className="primary-btn">
              View Profile
            </button>
            <button onClick={() => setSuccess(false)} className="secondary-btn">
              Post Another Job
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="post-job-container">
      <div className="post-job-header">
        <h1>Post a New Job</h1>
        <p>Create a compelling job listing to attract the best candidates</p>
        <div className="company-badge">
          <span className="company-icon">{company?.charAt(0).toUpperCase()}</span>
          <span>Posting for {company}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="job-form">
        <div className="form-sections">
          {/* Job Details Section */}
          <div className="form-section">
            <h3>Job Details</h3>
            
            <div className="form-group">
              <label htmlFor="title">Job Title *</label>
              <input
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Senior Software Engineer"
                className="form-input"
                disabled={loading}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="jobType">Job Type *</label>
                <select
                  id="jobType"
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  className="form-input"
                  disabled={loading}
                  required
                >
                  <option value="">Select Job Type</option>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="workplaceType">Workplace Type *</label>
                <select
                  id="workplaceType"
                  name="workplaceType"
                  value={formData.workplaceType}
                  onChange={handleChange}
                  className="form-input"
                  disabled={loading}
                  required
                >
                  <option value="">Select Workplace Type</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-Site">On-Site</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="location">Location *</label>
                <input
                  id="location"
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., San Francisco, CA, USA"
                  className="form-input"
                  disabled={loading}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="experience">Experience Level</label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="form-input"
                  disabled={loading}
                >
                  <option value="">Select Experience Level</option>
                  <option value="Entry Level">Entry Level (0-2 years)</option>
                  <option value="Mid Level">Mid Level (3-5 years)</option>
                  <option value="Senior Level">Senior Level (6-10 years)</option>
                  <option value="Executive">Executive (10+ years)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="salary">Salary Range (Optional)</label>
              <input
                id="salary"
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="e.g., $80,000 - $120,000 per year"
                className="form-input"
                disabled={loading}
              />
            </div>
          </div>

          {/* Job Description Section */}
          <div className="form-section">
            <h3>Job Description</h3>
            
            <div className="form-group">
              <label htmlFor="description">Job Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide a detailed description of the role, responsibilities, and what makes this opportunity exciting..."
                className="form-textarea"
                rows="6"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="requirements">Requirements & Qualifications *</label>
              <textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="List the required skills, qualifications, education, and experience needed for this role..."
                className="form-textarea"
                rows="8"
                disabled={loading}
                required
              />
              <small className="form-hint">
                Be specific about technical skills, years of experience, education requirements, etc.
              </small>
            </div>
          </div>
        </div>

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="secondary-btn"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`primary-btn ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Posting Job...' : 'Post Job'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
