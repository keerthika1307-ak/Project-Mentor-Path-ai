      const express = require('express');
      const bcrypt = require('bcrypt');
      const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library
      const User = require('../models/User');
      const router = express.Router();

      // Register
      router.post('/register', async (req, res) => {
        try {
          const hashedPassword = await bcrypt.hash(req.body.password, 10);
          const user = new User({
            ...req.body,
            password: hashedPassword
          });
          await user.save();
          
          // Send a success response after the user is saved.
          // It's a good practice to not return the full user object.
          res.status(201).json({ 
            message: 'User registered successfully!',
            userId: user._id,
            role: user.role
          });

        } catch (err) {
          // Handle errors during registration (e.g., duplicate email)
          res.status(400).json({ error: err.message });
        }
      });

      // Login
      router.post('/login', async (req, res) => {
        try {
          const { email, password } = req.body;
          const user = await User.findOne({ email });
          
          if (!user) {
            return res.status(400).json({ error: 'User not found' });
          }

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
      { userId: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
      );

        // Send the token and user info in the response
        res.json({ 
        token, 
        role: user.role, 
        userId: user._id 
      });
    
      } catch (err) {
      res.status(500).json({ error: err.message });
      }
      });

      module.exports = router;