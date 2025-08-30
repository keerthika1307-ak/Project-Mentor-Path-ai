// backend/controllers/feedbackController.js
const Feedback = require('../models/Feedback');
const Student = require('../models/Student');
const { generateAcademicFeedback } = require('../utils/openai');

exports.addMentorFeedback = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { feedback } = req.body;
    const newFeedback = new Feedback({
      student: studentId,
      mentor: req.user._id,
      feedback,
      createdAt: new Date(),
    });
    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add feedback' });
  }
};

exports.generateAiFeedback = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });

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
    res.status(500).json({ message: 'Failed to generate AI feedback' });
  }
};

function calculateCGPA(marksArray) {
  if (!marksArray || marksArray.length === 0) return 0;
  let totalPoints = 0;
  marksArray.forEach(({ grade }) => {
    totalPoints += gradeToPoint(grade);
  });
  return (totalPoints / marksArray.length).toFixed(2);
}

function gradeToPoint(grade) {
  const map = { 'A+': 10, A: 9, 'B+': 8, B: 7, 'C+': 6, C: 5, D: 4, F: 0 };
  return map[grade] || 0;
}
