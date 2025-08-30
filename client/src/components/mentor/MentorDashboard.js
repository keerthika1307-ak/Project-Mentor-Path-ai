// frontend/src/components/mentor/MentorDashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MentorDashboard = () => {
  const navigate = useNavigate();
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [reportData, setReportData] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch('/api/students', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (!res.ok) throw new Error('Failed to fetch students');
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
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleGenerateReport = async () => {
    if (!selectedStudentId) return alert('Select a student');
    try {
      const res = await fetch(`/api/reports/student/${selectedStudentId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (!res.ok) throw new Error('Failed to generate report');
      const data = await res.json();
      setReportData(data);
    } catch (err) {
      console.error(err);
      alert('Failed to generate report');
    }
  };

  const handleAddStudent = () => {
    // Navigate to add student page or show modal
    alert('Add Student clicked');
  };

  const handleSendNotification = () => {
    // Navigate to notification page or show modal
    alert('Send Notification clicked');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem',
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

      {/* Main Content Area */}
      <main
        style={{
          flexGrow: 1,
          padding: '2rem',
          background: 'linear-gradient(135deg, #8679f2, #8697f2)',
          color: '#fff',
        }}
      >
        <h2 style={{ marginBottom: '1rem' }}>Quick Actions</h2>
        <div style={{ marginBottom: '2rem' }}>
          <button
            onClick={handleAddStudent}
            style={{ marginRight: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
          >
            Add Student
          </button>
          <button
            onClick={handleGenerateReport}
            style={{ marginRight: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
          >
            Generate Report
          </button>
          <button onClick={handleSendNotification} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
            Send Notification
          </button>
        </div>

        {/* Generate Report Section */}
        <section
          style={{
            backgroundColor: 'rgba(0,0,0,0.2)',
            padding: '1rem',
            borderRadius: '8px',
            maxWidth: '500px',
          }}
        >
          <h3>Generate Student Report</h3>
          <select
            onChange={(e) => setSelectedStudentId(e.target.value)}
            value={selectedStudentId}
            style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%' }}
          >
            <option value="">Select Student</option>
            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleGenerateReport}
            style={{ padding: '0.5rem 1rem', marginBottom: '1rem', cursor: 'pointer' }}
          >
            Generate Report
          </button>

          {reportData && (
            <div style={{ marginTop: '1rem' }}>
              <h4>Report for {reportData.name}</h4>
              <p>
                <strong>CGPA:</strong> {reportData.cgpa}
              </p>
              <p>
                <strong>Attendance:</strong> {reportData.attendance}%
              </p>
              {/* Expand with more report details if needed */}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default MentorDashboard;
