const WeeklyWorkoutPlan = require('../models/WeeklyWorkoutPlan');
const {
  createDailyWorkoutPlan,
} = require('../repository/workoutPlanRepository');
const axios = require('axios');

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

    // Call external API to generate workout plan
    const apiResponse = await axios.post(
      'http://127.0.0.1:6000/generate-weekly-workout-plan',
      { age, weight, goal, gender, height }
    );

    if (apiResponse.status !== 200 || !apiResponse.data) {
      return res
        .status(500)
        .json({ message: 'Failed to generate workout plan from API.' });
    }

    const apiWorkoutData = apiResponse.data;

    // Generate Daily Workout Plans for each day of the week
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
    for (const [index, day] of daysOfWeek.entries()) {
      const workouts = apiWorkoutData[day] || [];
      const dailyPlanId = await createDailyWorkoutPlan(day, workouts);
      dailyPlans.push(dailyPlanId);
    }

    // Create Weekly Workout Plan
    const weeklyWorkoutPlan = new WeeklyWorkoutPlan({
      user: req.user._id,
      week: dailyPlans,
      goal,
      age,
      weight,
      height,
      gender,
    });

    // Save WeeklyWorkoutPlan to database
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

module.exports = { createWeeklyWorkoutPlan, getMyWeeklyWorkoutPlan };
