import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Login = () => {
  const [credentials, setCredentials] = useState({ 
    email: 'mentor@example.com', // Pre-filled for testing
    password: 'test123'
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', credentials);
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      
      alert(`Logged in as ${data.role}!`);
      navigate(`/${data.role}`); // Redirect to role-specific dashboard

    } catch (error) {
      alert(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Mentor Path AI - Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={credentials.email}
          onChange={(e) => setCredentials({...credentials, email: e.target.value})}
          placeholder="Email"
          required
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <input
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
          placeholder="Password"
          required
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <button 
          type="submit"
          style={{ width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}
        >
          Login
        </button>
      </form>
      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        <strong>Demo Credentials:</strong><br />
        Email: mentor@example.com<br />
        Password: test123
      </p>
      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        Don't have an account? <a href="/register" style={{ color: '#4CAF50' }}>Register here</a>
      </p>
    </div>
  );
};


export default Login;

