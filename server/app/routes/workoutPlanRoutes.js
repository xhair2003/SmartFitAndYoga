const express = require('express');
const {
  createWeeklyWorkoutPlan,
  getMyWeeklyWorkoutPlan,
  aIPredict,
} = require('../controllers/workoutPlanController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Tạo Weekly Workout Plan mới
router.post('/', authMiddleware, createWeeklyWorkoutPlan);

// Lấy Weekly Workout Plan của cá nhân
router.get('/my', authMiddleware, getMyWeeklyWorkoutPlan);

// Lấy Weekly Meal Plan của cá nhân
router.post('/generate-weekly-workout-plan', authMiddleware, aIPredict);

module.exports = router;
