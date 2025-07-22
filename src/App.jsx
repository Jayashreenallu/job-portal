import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import JobProviderDashboard from './components/JobProviderDashboard';
import PostJob from './components/Postjob';
import JobList from './components/JobList';
import EditJob from './components/EditJob';
import SelectCompany from './components/Selectcompany';
import JobProviderProfile from './components/JobProviderProfile';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<JobProviderDashboard />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/manage-jobs" element={<JobList />} />
        <Route path="/edit-job/:id" element={<EditJob />} />
        <Route path="/" element={<SelectCompany />} />
        <Route path="/profile" element={<JobProviderProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
