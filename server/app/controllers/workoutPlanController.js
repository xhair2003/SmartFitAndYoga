const WeeklyWorkoutPlan = require('../models/WeeklyWorkoutPlan');
const { createDailyWorkoutPlan } = require('../repository/workoutPlanRepository');
const { callPredictApi } = require('../services/workoutService');

/**
 * Create a new Weekly Workout Plan
 */
const createWeeklyWorkoutPlan = async (req, res) => {
  try {
    const { age, weight, goal, gender, height } = req.body;

    // Validate required fields
    if (!age || !weight || !goal || !gender || !height) {
      return res.status(400).json({
        message: 'Age, weight, goal, gender, and height are required.',
      });
    }

    // Validate authentication
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'User not authenticated.' });
    }

    // Mock or fetch workouts data
    const apiWorkoutData = {}; // Replace this with the actual data fetching logic or mock data.

    const daysOfWeek = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];

    const dailyPlans = [];
    for (const day of daysOfWeek) {
      const workouts = apiWorkoutData[day] || [];
      if (!Array.isArray(workouts) || workouts.length === 0) {
        throw new Error(`No workouts provided for day ${day}`);
      }
      const dailyPlanId = await createDailyWorkoutPlan(day, workouts);
      dailyPlans.push(dailyPlanId);
    }

    const weeklyWorkoutPlan = new WeeklyWorkoutPlan({
      user: req.user._id,
      week: dailyPlans,
      goal,
      age,
      weight,
      height,
      gender,
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

/**
 * Save Weekly Workout Plan to Database (Reusable Function)
 */
const saveWeeklyWorkoutPlanToDB = async (data) => {
  try {
    const newWeeklyWorkoutPlan = new WeeklyWorkoutPlan({
      user: data.user,
      week: data.week,
      goal: data.goal,
      age: data.age,
      weight: data.weight,
      height: data.height,
      gender: data.gender,
      createdAt: data.createdAt,
    });

    const savedPlan = await newWeeklyWorkoutPlan.save();
    console.log('WeeklyWorkoutPlan saved:', savedPlan);

    return savedPlan;
  } catch (error) {
    console.error('Error saving WeeklyWorkoutPlan:', error);
    throw error;
  }
};

/**
 * Retrieve the current user's Weekly Workout Plan
 */
const getMyWeeklyWorkoutPlan = async (req, res) => {
  try {
    const weeklyWorkoutPlan = await WeeklyWorkoutPlan.findOne({
      user: req.user._id,
    }).populate({
      path: 'week', // Populate DailyWorkoutPlan
      populate: {
        path: 'workouts', // Populate Workout inside DailyWorkoutPlan
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

/**
 * Generate Weekly Workout Plan using AI Prediction
 */
const aIPredict = async (req, res) => {
  try {
    const { age, gender, weight, height, goal } = req.body;

    if (!age || !gender || !weight || !height || !goal) {
      return res
        .status(400)
        .json({ message: 'Age, weight, goal are required.' });
    }

    // Validate authentication
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'User not authenticated.' });
    }

    // Call the API to predict
    const result = await callPredictApi(age, gender, weight, height, goal);

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
      return res.status(400).json({
        message: 'No weekly workout plan data received.',
      });
    }
  } catch (error) {
    console.error('Error creating weekly workout plan:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createWeeklyWorkoutPlan,
  getMyWeeklyWorkoutPlan,
  aIPredict,
};
