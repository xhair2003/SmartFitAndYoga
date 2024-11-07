// src/routes/AuthRoutes.js
const express = require('express');
const { AuthController } = require('../controllers');
//const { AuthValidation } = require('../validation'); // Nhập khẩu xác thực
//const { validate } = require('../middlewares/validate'); // Nhập khẩu middleware xác thực
const router = express.Router();

router.post(
    '/signup', 
    AuthController.signup
);
router.post(
    '/signin',
    AuthController.signin
);

module.exports = router;