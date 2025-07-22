import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SelectCompany.css";

const SelectCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/companies")
      .then((res) => res.json())
      .then((data) => setCompanies(data))
      .catch((err) => console.log("Error fetching companies", err));
  }, []);

  const handleLogin = () => {
    const selectedCompany = companies.find(
      (c) =>
        c.name === company &&
        email.endsWith(c.emailDomain) &&
        password === c.password
    );

    if (selectedCompany) {
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="select-container">
      <h2>Select Company and Login</h2>
      <select value={company} onChange={(e) => setCompany(e.target.value)}>
        <option value="">-- Select Company --</option>
        {companies.map((c) => (
          <option key={c.id} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>

      <input
        type="email"
        placeholder="Enter your official email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter company password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="error">{error}</p>}

      <button onClick={handleLogin}>Continue to Dashboard</button>
    </div>
  );
};

export default SelectCompany;
