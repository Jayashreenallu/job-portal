import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./JobList.css";

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/jobs/${id}`, {
      method: "DELETE",
    });
    setJobs(jobs.filter((job) => job.id !== id));
  };

  return (
    <div className="joblist-container">
      <h2 className="joblist-title">Manage Job Listings</h2>
      {jobs.length === 0 ? (
        <p className="joblist-empty">No jobs posted yet.</p>
      ) : (
        jobs.map((job) => (
          <div key={job.id} className="joblist-card">
            <h4 className="joblist-jobtitle">{job.title}</h4>
            <p><strong>Type:</strong> {job.jobType}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Workplace:</strong> {job.workplaceType}</p>
            <p><strong>Requirements:</strong> {job.requirements}</p>
            <Link to={`/edit-job/${job.id}`} className="joblist-edit">Edit</Link>
            <button className="joblist-delete" onClick={() => handleDelete(job.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default JobList;
