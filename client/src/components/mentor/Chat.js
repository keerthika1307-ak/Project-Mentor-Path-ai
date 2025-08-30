// frontend/src/components/mentor/Chat.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Chat = ({ mentorId, studentId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchMessages();
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
      console.error(error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    try {
      await axios.post('/api/chat/send', {
        sender: mentorId,
        senderModel: 'Mentor',
        receiver: studentId,
        receiverModel: 'Student',
        message: input.trim(),
      });
      setInput('');
      fetchMessages();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: 10, width: 400 }}>
      <div style={{ height: 300, overflowY: 'scroll', marginBottom: 10 }}>
        {messages.map((msg) => (
          <div
            key={msg._id}
            style={{
              textAlign: msg.sender === mentorId ? 'right' : 'left',
              margin: '5px 0',
            }}
          >
            <span
              style={{
                backgroundColor: msg.sender === mentorId ? '#aee1f9' : '#e1e1e1',
                padding: '5px 10px',
                borderRadius: 10,
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
        placeholder="Type a message"
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        style={{ width: '80%', padding: 5 }}
      />
      <button onClick={sendMessage} style={{ width: '18%', marginLeft: '2%' }}>
        Send
      </button>
    </div>
  );
};

export default Chat;
