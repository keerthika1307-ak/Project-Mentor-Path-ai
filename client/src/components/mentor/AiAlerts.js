// frontend/src/components/mentor/AiAlerts.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AiAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await axios.get('/api/mentor/ai-alerts');
        setAlerts(res.data);
      } catch {
        setError('Failed to load AI alerts');
      }
    };
    fetchAlerts();
  }, []);

  return (
    <div>
      <h3>AI Alerts</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {alerts.length === 0 ? (
        <p>No alerts</p>
      ) : (
        <ul>
          {alerts.map((alert) => (
            <li key={alert._id}>
              <strong>{alert.studentName}:</strong> {alert.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AiAlerts;
