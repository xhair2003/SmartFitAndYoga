const WeeklyWorkoutPlan = require('../models/WeeklyWorkoutPlan');
const {
  createDailyWorkoutPlan,
} = require('../repository/workoutPlanRepository');
const { generateWorkoutPlan } = require('../services/generateWorkoutPlan');

const createWeeklyWorkoutPlan = async (req, res) => {
  try {
    const { age, weight, goal } = req.body;

    if (!age || !weight || !goal) {
      return res
        .status(400)
        .json({ message: 'Age, weight, and goal are required.' });
    }

    // Danh sách các ngày trong tuần
    const daysOfWeek = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];

    // Tạo Daily Workout Plans
    const dailyPlans = [];
    for (const day of daysOfWeek) {
      const workouts = generateWorkoutPlan(age, weight, goal); // Gọi AI để sinh bài tập
      const dailyPlanId = await createDailyWorkoutPlan(day, workouts); // Tạo Daily Workout Plan
      dailyPlans.push(dailyPlanId); // Lưu ID của mỗi ngày
    }

    // Tạo Weekly Workout Plan
    const weeklyWorkoutPlan = new WeeklyWorkoutPlan({
      user: req.user._id,
      week: dailyPlans, // Tham chiếu tới DailyWorkoutPlans
    });

    await weeklyWorkoutPlan.save();

    res.status(201).json({
      message: 'Weekly Workout Plan created successfully.',
      weeklyWorkoutPlan,
    });
  } catch (error) {
    console.error('Error creating weekly workout plan:', error);
    res.status(500).json({ error: error.message });
  }
};

const getMyWeeklyWorkoutPlan = async (req, res) => {
  try {
    // Tìm Weekly Workout Plan của người dùng
    const weeklyWorkoutPlan = await WeeklyWorkoutPlan.findOne({
      user: req.user._id,
    }).populate({
      path: 'week', // Populate DailyWorkoutPlan
      populate: {
        path: 'workouts', // Populate Workout bên trong DailyWorkoutPlan
        model: 'Workout',
      },
    });

    if (!weeklyWorkoutPlan) {
      return res
        .status(404)
        .json({ message: 'No Weekly Workout Plan found for this user.' });
    }

    res.status(200).json({
      message: 'Weekly Workout Plan retrieved successfully.',
      weeklyWorkoutPlan,
    });
  } catch (error) {
    console.error('Error retrieving weekly workout plan:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createWeeklyWorkoutPlan, getMyWeeklyWorkoutPlan };
