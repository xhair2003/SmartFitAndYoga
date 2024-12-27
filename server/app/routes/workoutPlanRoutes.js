const express = require('express');
const {
  createWeeklyWorkoutPlan,
  getMyWeeklyWorkoutPlan,
} = require('../controllers/workoutPlanController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Route để tạo Weekly Workout Plan mới
// POST /api/workout-plan
router.post('/generate', authMiddleware, createWeeklyWorkoutPlan);

// Route để lấy Weekly Workout Plan của người dùng hiện tại
// GET /api/workout-plan/my
router.get('/my', authMiddleware, getMyWeeklyWorkoutPlan);

module.exports = router;
