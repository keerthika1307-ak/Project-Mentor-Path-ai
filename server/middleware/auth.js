// server/middleware/auth.js

const jwt = require('jsonwebtoken');

/**
 * Authentication and authorization middleware
 * @param {string} [requiredRole] - Optional role required to access the route
 */
const auth = (requiredRole) => {
  return (req, res, next) => {
    // 1. Get token from Authorization header (Bearer token)
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    // 2. Deny access if no token
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided' });
    }

    try {
      // 3. Verify token using JWT secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Check role permissions if requiredRole is specified
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ error: `Requires ${requiredRole} privileges` });
      }

      // 5. Attach user info to request object for downstream handlers
      req.user = {
        id: decoded.userId,
        role: decoded.role,
      };

      next();
    } catch (err) {
      // Token invalid or expired
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  };
};

module.exports = auth;
