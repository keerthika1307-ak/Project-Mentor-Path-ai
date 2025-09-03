const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  rollNumber: { type: String, required: true, unique: true },
  course: { type: String },
  academicYear: { type: String },
  contact: { type: String },
  address: { type: String },
  attendance: { type: Number, default: 0 },
  marks: [{ subject: String, marks: Number, grade: String }],
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Linked to mentor
  department: { type: String },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
