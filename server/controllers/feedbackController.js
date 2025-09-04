const Feedback = require('../models/Feedback');
const Student = require('../models/Student');
const { generateAcademicFeedback } = require('../utils/openai');

// Add mentor's manual feedback
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
    res.status(201).json({ message: 'Feedback added', feedback: newFeedback });
  } catch (error) {
    console.error('Error adding mentor feedback:', error);
    res.status(500).json({ error: 'Failed to add feedback' });
  }
};

// Generate AI feedback based on student data
exports.generateAiFeedback = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    const feedback = await generateAcademicFeedback(student);
    res.json({ feedback });
  } catch (error) {
    console.error('Error generating AI feedback:', error);
    res.status(500).json({ error: 'Failed to generate AI feedback' });
  }
};
