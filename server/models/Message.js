// server/models/Message.js

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'senderModel',
    required: true,
  },
  senderModel: {
    type: String,
    enum: ['Mentor', 'Student'],
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'receiverModel',
    required: true,
  },
  receiverModel: {
    type: String,
    enum: ['Mentor', 'Student'],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true, // adds createdAt and updatedAt fields automatically
});

module.exports = mongoose.model('Message', messageSchema);
