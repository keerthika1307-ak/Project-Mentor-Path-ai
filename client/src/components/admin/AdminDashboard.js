import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ReportsTab component
const ReportsTab = () => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/admin/reports', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (!res.ok) throw new Error('Failed to fetch reports');
        const data = await res.json();
        setReportData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) return <p style={{ color: 'white' }}>Loading reports...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ color: 'white' }}>
      <h2>Reporting</h2>
      <ul>
        <li>Total Users: {reportData.totalUsers}</li>
        <li>Total Students: {reportData.totalStudents}</li>
        <li>Total Mentors: {reportData.totalMentors}</li>
        <li>Mentorship Relationships: {reportData.mentorshipCount}</li>
        <li>New Users (Last 30 Days): {reportData.newUsersLast30Days}</li>
      </ul>
    </div>
  );
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('metrics');
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Mock metrics data
  const mockData = {
    users: 156,
    mentors: 42,
    students: 114,
    mentorshipRelationships: 98,
    newUsersLast30Days: 23,
  };

  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await fetch('/api/admin/students', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (!res.ok) throw new Error('Failed to fetch students');
        const data = await res.json();
        setStudents(data);
      } catch (err) {
        console.error(err);
      }
    }

    if (activeTab === 'users') {
      fetchStudents();
    }
  }, [activeTab]);

  // Filter students by search term
  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard admin-dashboard" style={{ fontFamily: 'Arial, sans-serif' }}>
      <header
        style={{
          padding: '20px',
          background: '#7269F9',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1>Admin Dashboard</h1>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ borderRadius: '20px', border: 'none', padding: '8px 15px', width: '200px' }}
        />
        <button
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/login');
          }}
          style={{
            backgroundColor: '#e55353',
            border: 'none',
            borderRadius: 4,
            color: 'white',
            padding: '8px 12px',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </header>

      <div className="dashboard-content" style={{ display: 'flex', minHeight: 'calc(100vh - 80px)' }}>
        <nav
          className="sidebar"
          style={{ background: '#574CE6', padding: 20, width: 200, color: 'white' }}
        >
          {['metrics', 'users', 'programs', 'reports'].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? 'active' : ''}
              onClick={() => setActiveTab(tab)}
              style={{
                display: 'block',
                marginBottom: 10,
                background: activeTab === tab ? '#7269F9' : 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '10px',
                width: '100%',
                textAlign: 'left',
                borderRadius: 4,
              }}
            >
              {tab === 'metrics'
                ? 'System Metrics'
                : tab === 'users'
                ? 'User  Management'
                : tab === 'programs'
                ? 'Program Control'
                : 'Reporting'}
            </button>
          ))}

          {/* Link to Add Student page */}
          <button
            onClick={() => navigate('/admin/add-student')}
            style={{
              marginTop: 20,
              background: '#3b3f9c',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '10px',
              width: '100%',
              borderRadius: 4,
            }}
          >
            Add Student
          </button>
        </nav>

        <main
          className="main-content"
          style={{ flexGrow: 1, padding: 20, background: 'rgba(114,105,249,0.3)' }}
        >
          {activeTab === 'metrics' && (
            <div className="metrics-section">
              <h2 style={{ color: 'white' }}>Overall System Metrics</h2>
              <div
                className="metric-cards"
                style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}
              >
                {Object.entries({
                  'Total Users': mockData.users,
                  'Active Mentors': mockData.mentors,
                  'Active Students': mockData.students,
                  'Mentorship Relationships': mockData.mentorshipRelationships,
                  'New Users (30 Days)': mockData.newUsersLast30Days,
                }).map(([title, value]) => (
                  <div
                    key={title}
                    className="metric-card"
                    style={{
                      background: '#7269F9',
                      borderRadius: 10,
                      padding: 20,
                      width: 180,
                      color: 'white',
                    }}
                  >
                    <h3>{title}</h3>
                    <p style={{ fontSize: 24, fontWeight: 'bold' }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="users-section" style={{ color: 'white' }}>
              <h2>User Management</h2>
              <input
                type="text"
                placeholder="Search students"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '8px 12px',
                  margin: '15px 0',
                  width: '100%',
                  maxWidth: 400,
                  borderRadius: 8,
                  border: 'none',
                }}
              />
              <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                {filteredStudents.length ? (
                  filteredStudents.map((student) => (
                    <li
                      key={student._id}
                      style={{
                        padding: 8,
                        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                      }}
                    >
                      {student.name}
                    </li>
                  ))
                ) : (
                  <li>No students found</li>
                )}
              </ul>
            </div>
          )}

          {activeTab === 'programs' && (
            <div style={{ color: 'white' }}>
              <h2>Program Control</h2>
              <p>Coming soon...</p>
            </div>
          )}

          {activeTab === 'reports' && <ReportsTab />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
