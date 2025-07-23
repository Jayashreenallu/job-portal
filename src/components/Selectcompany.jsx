import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SelectCompany.css";

const SelectCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/companies")
      .then((res) => res.json())
      .then((data) => setCompanies(data))
      .catch((err) => {
        console.log("Error fetching companies", err);
        setError("Failed to load companies. Please try again.");
      });
  }, []);

  const validateEmail = (email, domain) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.endsWith(domain);
  };

  const handleLogin = async () => {
    setError("");
    
    if (!company) {
      setError("Please select a company");
      return;
    }
    
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const selectedCompany = companies.find(c => c.name === company);
      
      if (!selectedCompany) {
        setError("Selected company not found");
        setLoading(false);
        return;
      }

      if (!validateEmail(email, selectedCompany.emailDomain)) {
        setError(`Please use your official ${selectedCompany.name} email (${selectedCompany.emailDomain})`);
        setLoading(false);
        return;
      }

      if (password !== selectedCompany.password) {
        setError("Invalid password for the selected company");
        setLoading(false);
        return;
      }

      // Store authentication data
      localStorage.setItem("selectedCompany", selectedCompany.name);
      localStorage.setItem("companyId", selectedCompany.id);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("isAuthenticated", "true");

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      setError("Login failed. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1 className="app-title">CareerCrafter</h1>
          <h2 className="login-subtitle">Job Provider Portal</h2>
          <p className="login-description">Sign in to manage your job postings and track applications</p>
        </div>

        <div className="login-form">
          <div className="form-group">
            <label htmlFor="company">Select Your Company</label>
            <select 
              id="company"
              value={company} 
              onChange={(e) => setCompany(e.target.value)}
              className="form-input"
              disabled={loading}
            >
              <option value="">-- Select Company --</option>
              {companies.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="email">Official Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your official email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              className="form-input"
              disabled={loading}
            />
            {company && companies.find(c => c.name === company) && (
              <small className="email-hint">
                Use your {companies.find(c => c.name === company).emailDomain} email
              </small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Company Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter company password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="form-input"
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            onClick={handleLogin} 
            className={`login-button ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Continue to Dashboard'}
          </button>
        </div>

        <div className="login-footer">
          <p>Need help? Contact your HR department for assistance.</p>
        </div>
      </div>
    </div>
  );
};

export default SelectCompany;
