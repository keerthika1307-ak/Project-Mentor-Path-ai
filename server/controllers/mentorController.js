const Student = require('../models/Student');
const Feedback = require('../models/Feedback');

exports.getMentorStudents = async (req, res) => {
  try {
    // Assuming each student document has a 'mentor' field referencing the mentor's _id
    const students = await Student.find({ mentor: req.user._id });
    res.json(students);
  } catch (error) {
    console.error('Error fetching mentor students:', error);
    res.status(500).json({ message: 'Failed to fetch students' });
  }
};

exports.getAiAlerts = async (req, res) => {
  try {
    // Placeholder: Replace with actual AI alert fetching logic for mentor's students
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
