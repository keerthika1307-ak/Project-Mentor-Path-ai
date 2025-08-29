import React from 'react';
import { useNavigate } from 'react-router-dom';  // Assuming react-router v6

const MentorDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // or your auth token key
    navigate('/login');
  };

  return (
    <div className="mentor-dashboard">
      <header className="dashboard-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#2c3e50', color: 'white'}}>
        <h1>Mentor Dashboard</h1>
        <button onClick={handleLogout} style={{backgroundColor: '#e74c3c', border: 'none', padding: '0.5rem 1rem', color: 'white', borderRadius: '4px', cursor: 'pointer'}}>
          Logout
        </button>
      </header>
      <div className="dashboard">
      <h1>Mentor Dashboard</h1>
      <div className="quick-actions">
        <button>Add Student</button>
        <button>Generate Report</button>
        <button>Send Notification</button>
      </div>
    </div>
      {/* Existing dashboard content below */}
    </div>
  );
};

export default MentorDashboard;
