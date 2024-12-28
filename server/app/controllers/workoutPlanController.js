const WeeklyWorkoutPlan = require('../models/WeeklyWorkoutPlan');
const {
  createDailyWorkoutPlan,
} = require('../repository/workoutPlanRepository');
const { generateWorkoutPlan } = require('../services/generateWorkoutPlan');
const { callPredictApi } = require('../services/workoutService');

const createWeeklyWorkoutPlan = async (req, res) => {
  try {
    const { age, weight, goal, gender, height } = req.body;

    if (!age || !weight || !goal || !gender || !height) {
      return res
        .status(400)
        .json({ message: 'Age, weight, goal, gender, and height are required.' });
    }

    // Days of the week
    const daysOfWeek = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];

    // Generate and create Daily Workout Plans
    const dailyPlans = [];
    for (const day of daysOfWeek) {
      const workouts = generateWorkoutPlan(age, weight, goal); // Gọi AI để sinh bài tập
      const dailyPlanId = await createDailyWorkoutPlan(day, workouts); // Tạo Daily Workout Plan
      dailyPlans.push(dailyPlanId); // Lưu ID của mỗi ngày
    }

    // Create Weekly Workout Plan
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
    // Find Weekly Workout Plan for the user
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

const aIPredict = async (req, res) => {
  try {
    const { age, weight, goal } = req.body;

    if (!age || !weight || !goal ) {
      return res
        .status(400)
        .json({ message: 'Age, weight, goal are required.' });
    }

    // Call the API to predict
    const result = await callPredictApi(age, weight, goal);

    if ('weekly_workout_plan' in result) {
      const dailyPlans = [];

      for (const detail of result['weekly_workout_plan']) {
        const day = detail['day'];
        const workouts = detail['workouts'];

        // Insert daily workout plans into the repository
        const dailyPlanId = await createDailyWorkoutPlan(day, workouts);
        dailyPlans.push(dailyPlanId);
      }

      // Save the weekly plan with references to daily plans
      const weeklyWorkoutPlan = new WeeklyWorkoutPlan({
        user: req.user._id,
        week: dailyPlans, // Store references to the created daily plans
      });

      await weeklyWorkoutPlan.save();

      // Respond to the client
      return res.status(201).json({
        message: 'Weekly Workout Plan created successfully.',
        weeklyWorkoutPlan,
      });
    } else {
      return res.status(400).json({ message: 'No weekly workout plan data received.' });
    }
  } catch (error) {
    console.error('Error creating weekly workout plan:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createWeeklyWorkoutPlan, getMyWeeklyWorkoutPlan, aIPredict };
