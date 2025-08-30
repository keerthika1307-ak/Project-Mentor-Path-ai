// frontend/src/components/mentor/MentorRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MentorDashboard from './MentorDashboard';
// import GenerateReport from './GenerateReport'; // if you have a separate page

const MentorRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MentorDashboard />} />
      {/* Add more mentor routes here */}
      {/* <Route path="generate-report" element={<GenerateReport />} /> */}
    </Routes>
  );
};

export default MentorRoutes;