// server/models/Mentor.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const mentorSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    default: 'mentor',
  },
  // Optional: list of students assigned to this mentor
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  }],
}, {
  timestamps: true,
});

// Password hashing middleware before saving
mentorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare password for login
mentorSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Mentor', mentorSchema);
