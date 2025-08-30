// frontend/src/components/student/Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = ({ studentId }) => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`/api/student/profile/${studentId}`);
        setProfile(res.data);
      } catch {
        setMessage('Failed to load profile');
      }
    };
    fetchProfile();
  }, [studentId]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    try {
      await axios.put(`/api/student/profile/${studentId}`, profile);
      setMessage('Profile updated');
    } catch {
      setMessage('Failed to update profile');
    }
  };

  return (
    <div>
      <h3>Student Profile</h3>
      {message && <p>{message}</p>}
      <input name="name" value={profile.name} onChange={handleChange} placeholder="Name" />
      <input name="email" value={profile.email} onChange={handleChange} placeholder="Email" />
      <input name="contact" value={profile.contact} onChange={handleChange} placeholder="Contact" />
      <input name="address" value={profile.address} onChange={handleChange} placeholder="Address" />
      <button onClick={saveProfile}>Save</button>
    </div>
  );
};

export default Profile;
