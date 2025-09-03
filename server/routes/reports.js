// server/routes/reports.js

const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// GET /student/:id - Get student report
router.get('/student/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Prepare report data (add more fields as needed)
    const report = {
      name: student.name,
      cgpa: student.cgpa,
      attendance: student.attendance,
      // Add other relevant fields here
    };

    res.json(report);
  } catch (err) {
    console.error('Error fetching student report:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
