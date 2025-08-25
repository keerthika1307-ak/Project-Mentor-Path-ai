import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('metrics');
  const navigate = useNavigate();

  const mockData = {
    users: 156,
    mentors: 42,
    students: 114,
    mentorshipRelationships: 98,
    newUsersLast30Days: 23
  };

  return (
    <div className="dashboard admin-dashboard">
      <header>
        <h1>Admin Dashboard</h1>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>
      </header>

      <nav className="dashboard-nav">
        <button onClick={() => navigate('/')}>Logout</button>
      </nav>

      <div className="dashboard-content">
        <div className="sidebar">
          <button 
            className={activeTab === 'metrics' ? 'active' : ''}
            onClick={() => setActiveTab('metrics')}
          >
            System Metrics
          </button>
          <button 
            className={activeTab === 'users' ? 'active' : ''}
            onClick={() => setActiveTab('users')}
          >
            User Management
          </button>
          <button 
            className={activeTab === 'programs' ? 'active' : ''}
            onClick={() => setActiveTab('programs')}
          >
            Program Control
          </button>
          <button 
            className={activeTab === 'reports' ? 'active' : ''}
            onClick={() => setActiveTab('reports')}
          >
            Reporting
          </button>
        </div>

        <div className="main-content">
          {activeTab === 'metrics' && (
            <div className="metrics-section">
              <h2>Overall System Metrics</h2>
              <div className="metric-cards">
                <div className="metric-card">
                  <h3>Total Users</h3>
                  <p>{mockData.users}</p>
                </div>
                <div className="metric-card">
                  <h3>Active Mentors</h3>
                  <p>{mockData.mentors}</p>
                </div>
                <div className="metric-card">
                  <h3>Active Students</h3>
                  <p>{mockData.students}</p>
                </div>
                <div className="metric-card">
                  <h3>Mentorship Relationships</h3>
                  <p>{mockData.mentorshipRelationships}</p>
                </div>
                <div className="metric-card">
                  <h3>New Users (30 Days)</h3>
                  <p>{mockData.newUsersLast30Days}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="users-section">
              <h2>User Management</h2>
              {/* User management table would go here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
