import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();

  const studentData = {
    name: 'Rahul Sharma',
    age: 20,
    fatherName: 'Sanjay Sharma',
    motherName: 'Priya Sharma',
    dob: '15-05-2003',
    bloodGroup: 'B+',
    religion: 'Hindu',
    phone: '9876543210',
    email: 'rahul.sharma@college.edu',
    address: '123, MG Road, Bangalore',
    admissionNo: 'COL20230515',
    rollNo: 'CS201'
  };

  return (
    <div className="dashboard student-dashboard">
      <header>
        <h1>Student Dashboard</h1>
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
            className={activeTab === 'profile' ? 'active' : ''}
            onClick={() => setActiveTab('profile')}
          >
            Personal Details
          </button>
          <button 
            className={activeTab === 'attendance' ? 'active' : ''}
            onClick={() => setActiveTab('attendance')}
          >
            Attendance
          </button>
          <button 
            className={activeTab === 'cgpa' ? 'active' : ''}
            onClick={() => setActiveTab('cgpa')}
          >
            CGPA
          </button>
          <button 
            className={activeTab === 'feedback' ? 'active' : ''}
            onClick={() => setActiveTab('feedback')}
          >
            Feedback
          </button>
        </div>

        <div className="main-content">
          {activeTab === 'profile' && (
            <div className="profile-section">
              <h2>Personal Details</h2>
              <div className="profile-grid">
                {Object.entries(studentData).map(([key, value]) => (
                  <div className="profile-field" key={key}>
                    <span className="field-name">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
                    <span className="field-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div className="attendance-section">
              <h2>Attendance Tracking</h2>
              {/* Attendance charts would go here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
