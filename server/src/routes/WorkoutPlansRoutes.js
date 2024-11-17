const express = require('express');
const router = express.Router();
const WorkoutPlansController = require('../controllers/WorkoutPlansController');

// Tạo mới kế hoạch tập luyện
router.post('/workout-plans', WorkoutPlansController.createWorkoutPlan);

// Lấy tất cả kế hoạch tập luyện
router.get('/workout-plans', WorkoutPlansController.getAllWorkoutPlans);

// Lấy chi tiết kế hoạch tập luyện
router.get('/workout-plans/:id', WorkoutPlansController.getWorkoutPlanById);

// Cập nhật kế hoạch tập luyện
router.put('/workout-plans/:id', WorkoutPlansController.updateWorkoutPlan);

// Xóa kế hoạch tập luyện
router.delete('/workout-plans/:id', WorkoutPlansController.deleteWorkoutPlan);

module.exports = router;
