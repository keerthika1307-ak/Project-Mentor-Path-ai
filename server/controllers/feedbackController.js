// backend/controllers/feedbackController.js

const Feedback = require('../models/Feedback');
const Student = require('../models/Student');
const { generateAcademicFeedback } = require('../utils/openai');

/**
 * Add feedback from mentor for a student
 */
exports.addMentorFeedback = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { feedback } = req.body;

    if (!feedback) {
      return res.status(400).json({ message: 'Feedback text is required' });
    }

    const newFeedback = new Feedback({
      student: studentId,
      mentor: req.user._id,
      feedback,
      createdAt: new Date(),
    });

    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (error) {
    console.error('Error adding mentor feedback:', error);
    res.status(500).json({ message: 'Failed to add feedback' });
  }
};

/**
 * Generate AI-based academic feedback for a student
 */
exports.generateAiFeedback = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

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
    res.status(500).json({ message: 'Failed to generate AI feedback' });
  }
};

/**
 * Helper function to calculate CGPA from marks array
 * @param {Array} marksArray - Array of objects with a 'grade' property
 * @returns {string} CGPA rounded to 2 decimals
 */
function calculateCGPA(marksArray) {
  if (!marksArray || marksArray.length === 0) return '0.00';

  let totalPoints = 0;
  marksArray.forEach(({ grade }) => {
    totalPoints += gradeToPoint(grade);
  });

  return (totalPoints / marksArray.length).toFixed(2);
}

/**
 * Helper function to convert grade to point
 * @param {string} grade - Grade string like 'A+', 'B', etc.
 * @returns {number} Numeric point equivalent
 */
function gradeToPoint(grade) {
  const map = {
    'A+': 10,
    A: 9,
    'B+': 8,
    B: 7,
    'C+': 6,
    C: 5,
    D: 4,
    F: 0,
  };
  return map[grade] || 0;
}
