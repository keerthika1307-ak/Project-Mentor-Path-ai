import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MentorDashboard = () => {
  const navigate = useNavigate();
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [reportData, setReportData] = useState(null);
  const [students, setStudents] = useState([]);  // Added state for students list

  // Fetch students on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch('/api/students', {  // Update API url as per backend
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        if (!res.ok) {
          throw new Error('Failed to fetch students');
        }
        const data = await res.json();
        setStudents(data);
      } catch (err) {
        console.error(err);
        alert('Failed to load students');
      }
    };
    fetchStudents();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // or your auth token key
    navigate('/login');
  };

  const handleGenerateReport = async () => {
    if (!selectedStudentId) return alert('Select a student');
    try {
      const res = await fetch(`/api/reports/student/${selectedStudentId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (!res.ok) {
        throw new Error('Failed to generate report');
      }
      const data = await res.json();
      setReportData(data);
    } catch (err) {
      console.error(err);
      alert('Failed to generate report');
    }
  };

  return (
    <div className="mentor-dashboard">
      <header
        className="dashboard-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem',
          backgroundColor: '#2c3e50',
          color: 'white',
        }}
      >
        <h1>Mentor Dashboard</h1>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: '#e74c3c',
            border: 'none',
            padding: '0.5rem 1rem',
            color: 'white',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
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

      {/* Generate Report Section */}
      <section className="generate-report-panel">
        <h2>Generate Student Report</h2>
        <select onChange={e => setSelectedStudentId(e.target.value)} value={selectedStudentId}>
          <option value="">Select Student</option>
          {/* Render students options */}
          {students.map(student => (
            <option key={student._id} value={student._id}>
              {student.name}
            </option>
          ))}
        </select>
        <button onClick={handleGenerateReport}>Generate Report</button>
        {reportData && (
          <div className="report-result">
            <h3>Report for {reportData.name}</h3>
            <p>CGPA: {reportData.cgpa}</p>
            <p>Attendance: {reportData.attendance}%</p>
            {/* Add more detailed report info */}
          </div>
        )}
      </section>
    </div>
  );
};

export default MentorDashboard;
