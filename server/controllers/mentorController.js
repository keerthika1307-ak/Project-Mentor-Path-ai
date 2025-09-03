// server/controllers/mentorController.js

const Student = require('../models/Student');
const Feedback = require('../models/Feedback');

/**
 * Get all students assigned to the logged-in mentor
 */
exports.getMentorStudents = async (req, res) => {
  try {
    // Assuming each student document has a 'mentor' field referencing the mentor's _id
    const students = await Student.find({ mentor: req.user._id }).select('_id name email attendance cgpa');
    res.json(students);
  } catch (error) {
    console.error('Error fetching mentor students:', error);
    res.status(500).json({ message: 'Failed to fetch students' });
  }
};

/**
 * Get AI-generated alerts for mentor's students
 * (Placeholder implementation - replace with real AI alert logic)
 */
exports.getAiAlerts = async (req, res) => {
  try {
    // TODO: Implement actual AI alert fetching logic based on mentor's students
    const alerts = [
      { _id: '1', studentName: 'John Doe', message: 'Low attendance alert' },
      { _id: '2', studentName: 'Jane Smith', message: 'Backlog alert' },
    ];
    res.json(alerts);
  } catch (error) {
    console.error('Error fetching AI alerts:', error);
    res.status(500).json({ message: 'Failed to fetch AI alerts' });
  }
};

/**
 * Send feedback from mentor to a student
 */
exports.sendFeedback = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { feedback } = req.body;

    if (!feedback || feedback.trim() === '') {
      return res.status(400).json({ message: 'Feedback content is required' });
    }

    const newFeedback = new Feedback({
      student: studentId,
      mentor: req.user._id,
      feedback,
      createdAt: new Date(),
    });

    await newFeedback.save();

    res.status(201).json({ message: 'Feedback sent successfully', feedback: newFeedback });
  } catch (error) {
    console.error('Error sending feedback:', error);
    res.status(500).json({ message: 'Failed to send feedback' });
  }
};
