// frontend/src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser ] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Example: fetch current user info on mount
    const fetchUser  = async () => {
      try {
        const res = await axios.get('/api/auth/me');
        setUser (res.data);
      } catch {
        setUser (null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser ();
  }, []);

  const login = async (credentials) => {
    const res = await axios.post('/api/auth/login', credentials);
    setUser (res.data.user);
  };

  const logout = async () => {
    await axios.post('/api/auth/logout');
    setUser (null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
