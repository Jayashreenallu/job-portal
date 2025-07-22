import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h2>Manage Job Listings</h2>
      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        jobs.map((job) => (
          <div key={job.id} style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "15px", borderRadius: "8px" }}>
            <h4>{job.title}</h4>
            <p><strong>Type:</strong> {job.jobType}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Workplace:</strong> {job.workplaceType}</p>
            <p><strong>Requirements:</strong> {job.requirements}</p>
            <Link to={`/edit-job/${job.id}`} style={{ marginRight: "10px" }}>Edit</Link>
            <button onClick={() => handleDelete(job.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default JobList;
