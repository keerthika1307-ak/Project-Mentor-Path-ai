const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  rollNumber: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Linked to mentor
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
