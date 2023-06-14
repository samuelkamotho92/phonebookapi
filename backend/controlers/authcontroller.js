const express = require('express');
const jwt = require('jsonwebtoken');

// Initialize Express app
const app = express();



// Middleware for validating JWT tokens
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401); 
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403); 
    }

    req.user = user;
    next();
  });
}

