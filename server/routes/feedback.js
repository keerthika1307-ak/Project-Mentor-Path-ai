// backend/routes/feedback.js
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const { generateAcademicFeedback } = require('../utils/openai');
const { checkMentorAuth } = require('../middleware/auth');

router.post('/generate-ai-feedback/:studentId', checkMentorAuth, async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Calculate CGPA (reuse your existing logic or implement here)
    const cgpa = calculateCGPA(student.marks);

    const studentData = {
      name: student.name,
      cgpa,
      attendance: student.attendance,
      marks: student.marks,
    };

    const feedback = await generateAcademicFeedback(studentData);

    res.json({ feedback });
  } catch (error) {
    console.error('Error generating AI feedback:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

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