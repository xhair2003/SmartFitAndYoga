const express = require('express');
const {
  register,
  login,
  changePassword,
  //googleLogin,
} = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/change-password', changePassword);

//router.post('/google-login', googleLogin);

module.exports = router;
