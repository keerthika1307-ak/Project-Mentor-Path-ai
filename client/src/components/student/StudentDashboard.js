import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

const PerformanceMetrics = () => {
  const [subjects, setSubjects] = useState([]);
  const [marks, setMarks] = useState({}); // { subjectName: { marks, grade, attendance } }

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/student/performance', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await res.json();
      setSubjects(data.subjects || []);
      setMarks(data.marks || {});
    }
    fetchData();
  }, []);

  return (
    <div className="performance-metrics">
      <h3>Performance Metrics</h3>
      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Marks</th>
            <th>Grade</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map(subject => (
            <tr key={subject}>
              <td>{subject}</td>
              <td>{marks[subject]?.marks ?? '-'}</td>
              <td>{marks[subject]?.grade ?? '-'}</td>
              <td>{marks[subject]?.attendance ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const NotificationPanel = ({ notifications }) => (
  <div className="notification-panel">
    <h3>Notifications</h3>
    {notifications.length === 0 ? (
      <p>No notifications</p>
    ) : (
      <ul>
        {notifications.map((note, idx) => (
          <li key={idx}>{note.message}</li>
        ))}
      </ul>
    )}
  </div>
);

const BacklogGuidance = ({ backlogs }) => (
  <div className="backlog-guidance">
    <h3>Backlog Guidance</h3>
    {backlogs.length === 0 ? (
      <p>No backlogs</p>
    ) : (
      backlogs.map((course, idx) => (
        <div key={idx} className="backlog-item">
          <h4>{course.name}</h4>
          <p>{course.advice}</p>
        </div>
      ))
    )}
  </div>
);

const MentorFeedback = ({ feedbacks }) => (
  <div className="mentor-feedback">
    <h3>Mentor Feedback</h3>
    {feedbacks.length === 0 ? (
      <p>No feedback received yet.</p>
    ) : (
      feedbacks.map((fb, idx) => (
        <div key={idx} className="feedback-item">
          <p>{fb.text}</p>
          <small>{new Date(fb.date).toLocaleDateString()}</small>
        </div>
      ))
    )}
  </div>
);

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();

  // Example static data for notifications, backlogs, feedback
  const notifications = [{ message: 'New assignment posted' }, { message: 'Exam schedule released' }];
  const backlogs = [
    { name: 'Math 101', advice: 'Focus on practice problems and attend remedial classes' }
  ];
  const feedbacks = [
    { text: 'Keep up the good work!', date: '2023-09-15' }
  ];

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
                    <span className="field-name">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                    </span>
                    <span className="field-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div className="attendance-section">
              <h2>Attendance Tracking</h2>
              {/* Attendance charts or info */}
              <p>Attendance data coming soon...</p>
            </div>
          )}

          {activeTab === 'cgpa' && (
            <div className="cgpa-section">
              <h2>CGPA and Performance</h2>
              <PerformanceMetrics />
            </div>
          )}

          {activeTab === 'feedback' && (
            <div className="feedback-section">
              <h2>Feedback & Notifications</h2>
              <MentorFeedback feedbacks={feedbacks} />
              <NotificationPanel notifications={notifications} />
              <BacklogGuidance backlogs={backlogs} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
