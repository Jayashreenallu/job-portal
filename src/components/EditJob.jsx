import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    workplaceType: "",
    location: "",
    jobType: "",
    requirements: ""
  });

  useEffect(() => {
    fetch(`http://localhost:5000/jobs/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data));
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5000/jobs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });
    alert("Job Updated");
    navigate("/manage-jobs");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2>Edit Job</h2>
      <form onSubmit={handleSubmit}>
        <label>Job Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />

        <label>Workplace Type:</label>
        <select name="workplaceType" value={formData.workplaceType} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
          <option value="On-Site">On-Site</option>
        </select>

        <label>Location:</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} required />

        <label>Job Type:</label>
        <select name="jobType" value={formData.jobType} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Requirements:</label>
        <textarea name="requirements" value={formData.requirements} onChange={handleChange} required />

        <button type="submit" style={{ marginTop: "10px" }}>Update Job</button>
      </form>
    </div>
  );
};

export default EditJob;
