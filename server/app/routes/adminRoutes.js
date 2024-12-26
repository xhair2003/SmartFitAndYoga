const express = require('express');
const { getAllUsers, deleteUser, updateUser, addUser } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router();

router.get('/users', authMiddleware, adminMiddleware, getAllUsers);

router.delete('/users/:id', authMiddleware, adminMiddleware, deleteUser);

router.patch('/users/:id/update', authMiddleware, adminMiddleware, updateUser);

router.post('/users/add', authMiddleware, adminMiddleware, addUser);

module.exports = router;
