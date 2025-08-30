// frontend/src/components/admin/ManageCourse.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageCourse = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('/api/admin/courses');
      setCourses(res.data);
    } catch (error) {
      setMessage('Failed to load courses');
    }
  };

  const addCourse = async () => {
    if (!newCourse.trim()) return;
    try {
      await axios.post('/api/admin/courses', { name: newCourse });
      setNewCourse('');
      fetchCourses();
      setMessage('Course added');
    } catch {
      setMessage('Failed to add course');
    }
  };

  const deleteCourse = async (id) => {
    try {
      await axios.delete(`/api/admin/courses/${id}`);
      fetchCourses();
      setMessage('Course deleted');
    } catch {
      setMessage('Failed to delete course');
    }
  };

  return (
    <div>
      <h3>Manage Courses</h3>
      {message && <p>{message}</p>}
      <input
        type="text"
        placeholder="New Course Name"
        value={newCourse}
        onChange={(e) => setNewCourse(e.target.value)}
      />
      <button onClick={addCourse}>Add Course</button>
      <ul>
        {courses.map((course) => (
          <li key={course._id}>
            {course.name}{' '}
            <button onClick={() => deleteCourse(course._id)} style={{ color: 'red' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageCourse;
