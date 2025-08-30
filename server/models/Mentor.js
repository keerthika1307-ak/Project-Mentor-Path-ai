// backend/routes/mentor.js
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const { checkMentorAuth } = require('../middleware/auth');

// Get student report by student ID or roll number
router.get('/student-report/:studentId', checkMentorAuth, async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Prepare report data
    const report = {
      name: student.name,
      rollNumber: student.rollNumber,
      course: student.course,
      academicYear: student.academicYear,
      attendance: student.attendance,
      marks: student.marks,
      cgpa: calculateCGPA(student.marks), // Implement this function
    };

    res.json(report);
  } catch (error) {
    console.error('Error fetching student report:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Helper function to calculate CGPA
function calculateCGPA(marksArray) {
  if (!marksArray || marksArray.length === 0) return 0;
  let totalPoints = 0;
  marksArray.forEach(({ grade }) => {
    totalPoints += gradeToPoint(grade);
  });
  return (totalPoints / marksArray.length).toFixed(2);
}

function gradeToPoint(grade) {
  const map = { 'A+': 10, 'A': 9, 'B+': 8, 'B': 7, 'C+': 6, 'C': 5, 'D': 4, 'F': 0 };
  return map[grade] || 0;
}

module.exports = router;
