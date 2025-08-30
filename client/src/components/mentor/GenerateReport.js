// frontend/src/components/mentor/GenerateReport.js
import React, { useState } from 'react';
import axios from 'axios';

const GenerateReport = () => {
  const [studentId, setStudentId] = useState('');
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');

  const handleFetchReport = async () => {
    try {
      const res = await axios.get(`/api/mentor/student-report/${studentId}`);
      setReport(res.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching report');
      setReport(null);
    }
  };

  return (
    <div>
      <h2>Generate Student Report</h2>
      <input
        type="text"
        placeholder="Enter Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />
      <button onClick={handleFetchReport}>Generate Report</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {report && (
        <div>
          <h3>Report for {report.name}</h3>
          <p>Roll Number: {report.rollNumber}</p>
          <p>Course: {report.course}</p>
          <p>Academic Year: {report.academicYear}</p>
          <p>Attendance: {report.attendance}%</p>
          <p>CGPA: {report.cgpa}</p>
          <h4>Marks:</h4>
          <table border="1">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Marks</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {report.marks.map((m, idx) => (
                <tr key={idx}>
                  <td>{m.subject}</td>
                  <td>{m.marks}</td>
                  <td>{m.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GenerateReport;