const express = require('express');
const {
  createWeeklyMealPlan,
  getMyWeeklyMealPlan,
} = require('../controllers/mealPlanController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createWeeklyMealPlan);

router.get('/my', authMiddleware, getMyWeeklyMealPlan);


module.exports = router;
