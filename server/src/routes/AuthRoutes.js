// src/routes/AuthRoutes.js
const express = require('express');
const { AuthController } = require('../controllers');
//const { AuthValidation } = require('../validation'); // Nhập khẩu xác thực
//const { validate } = require('../middlewares/validate'); // Nhập khẩu middleware xác thực
//const { limiterAuth } = require('../utils/rateLimiter');
const router = express.Router();

router.post(
    '/signup', 
    //validate(AuthValidation.signup),
    AuthController.signup
);
router.post(
    '/signin',
    //validate(AuthValidation.signin),
    AuthController.signin
);

router.post('/refresh-token', AuthController.refreshToken);

module.exports = router;