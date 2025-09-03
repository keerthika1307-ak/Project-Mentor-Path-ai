const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'Leave'],
    required: true,
  },
  remarks: {
    type: String,
    default: '',
  },
  recordedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor', // or 'User ' if mentors are users
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Attendance', attendanceSchema);
