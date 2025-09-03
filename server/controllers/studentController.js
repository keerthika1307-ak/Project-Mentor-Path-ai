const Student = require('../models/Student');

exports.getStudents = async (req, res) => {
  try {
    const mentorId = req.user._id;
    const students = await Student.find({ mentor: mentorId }).select('_id name');
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Server error fetching students' });
  }
};

exports.getStudentReport = async (req, res) => {
  try {
    const mentorId = req.user._id;
    const studentId = req.params.id;

    const student = await Student.findOne({ _id: studentId, mentor: mentorId });
    if (!student) {
      return res.status(404).json({ message: 'Student not found or not assigned to you' });
    }

    res.json({
      name: student.name,
      cgpa: student.cgpa,
      attendance: student.attendance,
      // Add more report fields as needed
    });
  } catch (error) {
    console.error('Error fetching student report:', error);
    res.status(500).json({ message: 'Server error fetching student report' });
  }
};
