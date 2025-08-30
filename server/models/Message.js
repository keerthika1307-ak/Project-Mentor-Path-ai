const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, refPath: 'senderModel', required: true },
  senderModel: { type: String, enum: ['Mentor', 'Student'], required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, refPath: 'receiverModel', required: true },
  receiverModel: { type: String, enum: ['Mentor', 'Student'], required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', MessageSchema);