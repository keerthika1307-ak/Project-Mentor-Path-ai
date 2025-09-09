// server/models/Student.js

const mongoose = require('mongoose');
const feedbackController = require('../controllers/feedbackController');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  course: {
    type: String,
    default: '',
  },
  academicYear: {
    type: String,
    default: '',
  },
  contact: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
  attendance: {
    type: Number,
    default: 0,
  },
  cgpa: {
    type: Number,
    default: 0.0,
  },
  backlogs: {
    type: Number,
    default: 0,
  },
  marks: [{
    subject: { type: String, required: true },
    marks: { type: Number, required: true },
    grade: { type: String, required: true },
  }],
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor', // Reference to Mentor model
  },
  department: {
    type: String,
    default: '',
  },
}, {
  timestamps: true, // adds createdAt and updatedAt automatically
});

module.exports = mongoose.model('Student', studentSchema);
