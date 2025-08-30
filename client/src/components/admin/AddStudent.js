// frontend/src/components/admin/AddStudent.js
import React, { useState } from 'react';
import axios from 'axios';

const AddStudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNumber: '',
    course: '',
    academicYear: '',
    contact: '',
    address: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/admin/add-student', formData);
      setMessage(res.data.message);
      setFormData({
        name: '',
        email: '',
        rollNumber: '',
        course: '',
        academicYear: '',
        contact: '',
        address: '',
      });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error adding student');
    }
  };

  return (
    <div className="add-student-form">
      <h2>Add New Student</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="rollNumber" placeholder="Roll Number" value={formData.rollNumber} onChange={handleChange} required />
        <input type="text" name="course" placeholder="Course" value={formData.course} onChange={handleChange} />
        <input type="text" name="academicYear" placeholder="Academic Year" value={formData.academicYear} onChange={handleChange} />
        <input type="text" name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;