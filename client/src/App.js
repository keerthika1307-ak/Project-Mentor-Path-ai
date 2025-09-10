import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import MentorDashboard from './components/mentor/MentorDashboard';
import StudentDashboard from './components/student/StudentDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import Register from './components/Register';
import RequireAuth from './components/RequireAuth';
import AdminRoutes from './components/admin/AdminRoutes';
import MentorRoutes from './components/mentor/MentorRoutes';


//import Login from './components/Login';

function App() {
//const [userRole, setUserRole] = useState(null);

  return (
    <Router>
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={
          <RequireAuth requiredRole="admin">
            <AdminDashboard />
          </RequireAuth>
        }/>
        <Route path="/mentor" element={
          <RequireAuth requiredRole="mentor">
            <MentorDashboard />
          </RequireAuth>
        }/>
        <Route path="/student" element={
          <RequireAuth requiredRole="student">
            <StudentDashboard />
          </RequireAuth>
        }/>
        <Route path="/unauthorized" element={
          <div>You don't have permission to access this page</div>
        }/>
        <Route path="/" element={<Navigate to="/login" replace />} />

      </Routes>
    </Router>
  );
}

export default App;
