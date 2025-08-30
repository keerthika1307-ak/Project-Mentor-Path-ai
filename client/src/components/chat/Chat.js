import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Chat = ({ mentorId, studentId, userType }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchMessages();
    // Optionally, poll for new messages every few seconds
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [mentorId, studentId]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get('/api/chat/conversation', {
        params: { mentorId, studentId },
      });
      setMessages(res.data);
      scrollToBottom();
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const messagePayload = {
      sender: userType === 'mentor' ? mentorId : studentId,
      senderModel: userType === 'mentor' ? 'Mentor' : 'Student',
      receiver: userType === 'mentor' ? studentId : mentorId,
      receiverModel: userType === 'mentor' ? 'Student' : 'Mentor',
      message: input.trim(),
    };

    try {
      await axios.post('/api/chat/send', messagePayload);
      setInput('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', width: '400px' }}>
      <div style={{ height: '300px', overflowY: 'scroll', marginBottom: '10px' }}>
        {messages.map((msg) => (
          <div
            key={msg._id}
            style={{
              textAlign: msg.sender === (userType === 'mentor' ? mentorId : studentId) ? 'right' : 'left',
              margin: '5px 0',
            }}
          >
            <span
              style={{
                backgroundColor: msg.sender === (userType === 'mentor' ? mentorId : studentId) ? '#aee1f9' : '#e1e1e1',
                padding: '5px 10px',
                borderRadius: '10px',
                display: 'inline-block',
              }}
            >
              {msg.message}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        style={{ width: '80%', padding: '5px' }}
      />
      <button onClick={sendMessage} style={{ width: '18%', marginLeft: '2%' }}>
        Send
      </button>
    </div>
  );
};

export default Chat;