const express = require('express');
const {
  register,
  login,
  requestPasswordReset,
} = require('../controllers/authController');
const { reset } = require('nodemon');

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/request-reset', requestPasswordReset);

router.post('/reset-password/:token', reset);
module.exports = router;
