// frontend/src/components/student/BacklogGuidance.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BacklogGuidance = ({ studentId }) => {
  const [backlogs, setBacklogs] = useState([]);
  const [advice, setAdvice] = useState('');

  useEffect(() => {
    const fetchBacklogs = async () => {
      try {
        const res = await axios.get(`/api/student/backlogs/${studentId}`);
        setBacklogs(res.data.backlogs);
        setAdvice(res.data.advice);
      } catch (error) {
        setAdvice('Failed to load backlog guidance');
      }
    };
    fetchBacklogs();
  }, [studentId]);

  return (
    <div>
      <h3>Backlog Guidance</h3>
      {backlogs.length === 0 ? (
        <p>No backlogs</p>
      ) : (
        <>
          <ul>
            {backlogs.map((b) => (
              <li key={b.subject}>{b.subject} - Grade: {b.grade}</li>
            ))}
          </ul>
          <p>{advice}</p>
        </>
      )}
    </div>
  );
};

export default BacklogGuidance;
