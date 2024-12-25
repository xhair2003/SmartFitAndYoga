const express = require('express');
const { getAllUsers, deleteUser, updateRoleUser, updateNameUser } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router();

router.get('/users', authMiddleware, adminMiddleware, getAllUsers);

router.delete('/users/:id', authMiddleware, adminMiddleware, deleteUser);

router.patch('/users/:id/role', authMiddleware, adminMiddleware, updateRoleUser);

router.patch('/users/:id/name', authMiddleware, adminMiddleware, updateNameUser);



module.exports = router;
