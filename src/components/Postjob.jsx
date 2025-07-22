import React, { useState } from "react";
import "./Postjob.css";

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    workplaceType: "",
    location: "",
    jobType: "",
    requirements: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });
    alert("Job Posted");
    setFormData({
      title: "",
      workplaceType: "",
      location: "",
      jobType: "",
      requirements: ""
    });
  };

  return (
    <div className="postjob-container">
      <h2 className="postjob-title">Post a New Job</h2>
      <form className="postjob-form" onSubmit={handleSubmit}>

        <div>
        <label className="postjob-label">Job Title:</label>
        <input className="postjob-input" type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div>
        <label className="postjob-label">Workplace Type:</label>
        <select className="postjob-select" name="workplaceType" value={formData.workplaceType} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
          <option value="On-Site">On-Site</option>
        </select>
        </div>
        
        <div>
        <label className="postjob-label">Location (City, State, Country):</label>
        <input className="postjob-input" type="text" name="location" value={formData.location} onChange={handleChange} required />
        </div>
        
        <div>
        <label className="postjob-label">Job Type:</label>
        <select className="postjob-select" name="jobType" value={formData.jobType} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Internship">Internship</option>
        </select>
        </div>

       
        <label className="postjob-label">Requirements:</label>
        <textarea className="postjob-textarea" name="requirements" value={formData.requirements} onChange={handleChange} required />
        

        <button className="postjob-button" type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default PostJob;
