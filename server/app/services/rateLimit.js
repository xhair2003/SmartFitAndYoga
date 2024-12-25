const rateLimit = require('express-rate-limit');

// General rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Maximum 100 requests per IP
  message: 'Too many requests from this IP, please try again after 15 minutes.',
});

// Authentication-specific rate limiter
const limiterAuth = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // Maximum 5 requests per IP
  message: 'Too many requests from this IP, please try again after 60s.',
});

module.exports = { limiter, limiterAuth };
