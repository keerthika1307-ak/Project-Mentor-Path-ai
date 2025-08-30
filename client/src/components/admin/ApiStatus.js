// frontend/src/components/admin/ApiStatus.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApiStatus = () => {
  const [status, setStatus] = useState({ openai: false, twilio: false, nodemailer: false });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get('/api/admin/api-status');
        setStatus(res.data);
      } catch (err) {
        setError('Failed to fetch API status');
      }
    };
    fetchStatus();
  }, []);

  return (
    <div>
      <h3>API Connection Status</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        <li>OpenAI API: {status.openai ? 'Connected' : 'Disconnected'}</li>
        <li>Twilio API: {status.twilio ? 'Connected' : 'Disconnected'}</li>
        <li>Nodemailer: {status.nodemailer ? 'Connected' : 'Disconnected'}</li>
      </ul>
    </div>
  );
};

export default ApiStatus;
