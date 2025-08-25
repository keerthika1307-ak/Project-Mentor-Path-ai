const jwt = require('jsonwebtoken');

const auth = (requiredRole) => {
  return (req, res, next) => {
    // 1. Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // 2. Deny access if no token
    if (!token) {
      return res.status(401).json({ 
        error: 'Access denied. No token provided' 
      });
    }

    try {
      // 3. Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // 4. Check role permissions (if specified)
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ 
          error: `Requires ${requiredRole} privileges` 
        });
      }

      // 5. Attach user data to request
      req.user = {
        id: decoded.userId,
        role: decoded.role
      };

      next();
    } catch (err) {
      res.status(401).json({ 
        error: 'Invalid or expired token' 
      });
    }
  };
};

module.exports = auth;
