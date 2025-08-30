// frontend/src/components/admin/AdminRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import AddStudent from './AddStudent'; // Your AddStudent component

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="add-student" element={<AddStudent />} />
      {/* Add more admin routes here */}
    </Routes>
  );
};

export default AdminRoutes;
