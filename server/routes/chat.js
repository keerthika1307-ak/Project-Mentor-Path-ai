const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { checkMentorAuth, checkStudentAuth } = require('../middleware/auth');

// Send message (Mentor or Student)
router.post('/send', async (req, res) => {
  try {
    const { sender, senderModel, receiver, receiverModel, message } = req.body;

    if (!sender || !receiver || !message || !senderModel || !receiverModel) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newMessage = new Message({
      sender,
      senderModel,
      receiver,
      receiverModel,
      message,
    });

    await newMessage.save();

    res.status(201).json({ message: 'Message sent', data: newMessage });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get chat messages between mentor and student
router.get('/conversation', async (req, res) => {
  try {
    const { mentorId, studentId } = req.query;

    if (!mentorId || !studentId) {
      return res.status(400).json({ message: 'mentorId and studentId are required' });
    }

    const messages = await Message.find({
      $or: [
        { sender: mentorId, senderModel: 'Mentor', receiver: studentId, receiverModel: 'Student' },
        { sender: studentId, senderModel: 'Student', receiver: mentorId, receiverModel: 'Mentor' },
      ],
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (error) {
    console.error('Error fetching conversation:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;