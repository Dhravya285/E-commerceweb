const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    // Allow guest users to proceed
    req.user = { 
      id: null, 
      username: 'Guest' 
    };
    return next();
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // If token is invalid, still allow guest access
      req.user = { 
        id: null, 
        username: 'Guest' 
      };
      return next();
    }
    
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;