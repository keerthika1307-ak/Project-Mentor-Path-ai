import React, { useState } from "react";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("metrics");
  const [searchTerm, setSearchTerm] = useState("");

  // Dummy data for the metrics
  const systemMetrics = {
    totalUsers: 156,
    activeMentors: 42,
    activeStudents: 114,
    mentorshipRelationships: 98,
    newUsers30Days: 23,
  };

  const handleLogout = () => {
    // Handle logout logic (redirect, clear auth tokens, etc)
    alert("Logged out!");
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: "bold" }}>
          Admin Dashboard
        </h1>
        <input
          type="text"
          placeholder="Search..."
          style={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </header>

      {/* Body layout */}
      <div style={styles.body}>
        {/* Sidebar */}
        <nav style={styles.sidebar}>
          <ul style={styles.navList}>
            <li
              style={activeTab === "metrics" ? styles.activeNavItem : styles.navItem}
              onClick={() => setActiveTab("metrics")}
            >
              System Metrics
            </li>
            <li
              style={activeTab === "users" ? styles.activeNavItem : styles.navItem}
              onClick={() => setActiveTab("users")}
            >
              User Management
            </li>
            <li
              style={activeTab === "program" ? styles.activeNavItem : styles.navItem}
              onClick={() => setActiveTab("program")}
            >
              Program Control
            </li>
            <li
              style={activeTab === "reporting" ? styles.activeNavItem : styles.navItem}
              onClick={() => setActiveTab("reporting")}
            >
              Reporting
            </li>
          </ul>
        </nav>

        {/* Main content */}
        <main style={styles.mainContent}>
          {activeTab === "metrics" && (
            <>
              <h2 style={{ marginBottom: 20 }}>Overall System Metrics</h2>
              <div style={styles.metricsGrid}>
                <MetricCard title="Total Users" value={systemMetrics.totalUsers} />
                <MetricCard title="Active Mentors" value={systemMetrics.activeMentors} />
                <MetricCard title="Active Students" value={systemMetrics.activeStudents} />
                <MetricCard title="Mentorship Relationships" value={systemMetrics.mentorshipRelationships} />
                <MetricCard title="New Users (30 Days)" value={systemMetrics.newUsers30Days} />
              </div>
            </>
          )}

          {activeTab === "users" && (
            <p>User Management content goes here...</p>
          )}

          {activeTab === "program" && (
            <p>Program Control content goes here...</p>
          )}

          {activeTab === "reporting" && (
            <p>Reporting content goes here...</p>
          )}
        </main>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value }) => (
  <div style={styles.metricCard}>
    <h3 style={{ margin: "0 0 10px", fontWeight: "bold" }}>{title}</h3>
    <p style={{ fontSize: 24, margin: 0 }}>{value}</p>
  </div>
);

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "linear-gradient(135deg, #7b7dff, #a97bff)",
    color: "#fff",
  },
  header: {
    display: "flex",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#7279d8",
    justifyContent: "space-between",
  },
  searchInput: {
    borderRadius: 20,
    border: "none",
    padding: "6px 15px",
    fontSize: 14,
    width: 200,
    outline: "none",
  },
  logoutButton: {
    backgroundColor: "#e14e4e",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    padding: "6px 12px",
    cursor: "pointer",
  },
  body: {
    display: "flex",
    flex: 1,
    minHeight: 0,
  },
  sidebar: {
    width: 180,
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: 15,
    boxSizing: "border-box",
  },
  navList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  navItem: {
    padding: "10px 15px",
    cursor: "pointer",
    borderRadius: 5,
    marginBottom: 10,
    color: "#eee",
    userSelect: "none",
    transition: "background-color 0.3s",
  },
  activeNavItem: {
    padding: "10px 15px",
    cursor: "pointer",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#9999ff",
    color: "#fff",
    userSelect: "none",
    fontWeight: "bold",
  },
  mainContent: {
    flex: 1,
    padding: 30,
    overflowY: "auto",
  },
  metricsGrid: {
    display: "flex",
    gap: 20,
    flexWrap: "wrap",
  },
  metricCard: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 20,
    borderRadius: 12,
    minWidth: 160,
    flex: "1 1 150px",
    boxSizing: "border-box",
  },
};


// backend/routes/admin.js
const express = require('express');
const router = express.Router();
const Student = require('../models/Student'); // Assuming you have a Student model
const { checkAdminAuth } = require('../middleware/auth'); // Middleware to check admin auth

// Add new student
router.post('/add-student', checkAdminAuth, async (req, res) => {
  try {
    const { name, email, rollNumber, course, academicYear, contact, address } = req.body;

    // Basic validation
    if (!name || !email || !rollNumber) {
      return res.status(400).json({ message: 'Name, Email and Roll Number are required' });
    }

    // Check if student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student with this email already exists' });
    }

    const newStudent = new Student({
      name,
      email,
      rollNumber,
      course,
      academicYear,
      contact,
      address,
      createdAt: new Date(),
    });

    await newStudent.save();

    res.status(201).json({ message: 'Student added successfully', student: newStudent });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;




export default Admin;
