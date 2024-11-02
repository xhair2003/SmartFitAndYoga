const express = require('express');
//const AuthController = require('../controllers/AuthController');
const router = express.Router();

router.get('/hello', (req, res) => {
    res.json({
        message: "Xin chào! Đây là API test"
    });
});

module.exports = router;
