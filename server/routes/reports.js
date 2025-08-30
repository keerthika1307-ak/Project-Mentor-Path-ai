const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.get('/student/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    // Calculate CGPA, attendance, etc. or fetch from DB
    const report = {
      name: student.name,
      cgpa: student.cgpa,
      attendance: student.attendance,
      // add more fields as needed
    };

    res.json(report);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
