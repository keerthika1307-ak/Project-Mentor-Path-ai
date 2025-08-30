// frontend/src/components/mentor/Feedback.js
import React, { useState } from 'react';
import axios from 'axios';

const Feedback = ({ studentId }) => {
  const [mentorFeedback, setMentorFeedback] = useState('');
  const [aiFeedback, setAiFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const sendMentorFeedback = async () => {
    if (!mentorFeedback.trim()) return;
    try {
      await axios.post(`/api/mentor/feedback/${studentId}`, { feedback: mentorFeedback });
      setMessage('Feedback sent');
      setMentorFeedback('');
    } catch {
      setMessage('Failed to send feedback');
    }
  };

  const generateAiFeedback = async () => {
    setLoading(true);
    setMessage('');
    try {
      const res = await axios.post(`/api/feedback/generate-ai-feedback/${studentId}`);
      setAiFeedback(res.data.feedback);
    } catch {
      setMessage('Failed to generate AI feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Mentor Feedback</h3>
      <textarea
        rows="4"
        value={mentorFeedback}
        onChange={(e) => setMentorFeedback(e.target.value)}
        placeholder="Write your feedback here"
      />
      <br />
      <button onClick={sendMentorFeedback}>Send Feedback</button>

      <h3>AI Generated Feedback</h3>
      <button onClick={generateAiFeedback} disabled={loading}>
        {loading ? 'Generating...' : 'Generate AI Feedback'}
      </button>
      {aiFeedback && <p>{aiFeedback}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Feedback;
