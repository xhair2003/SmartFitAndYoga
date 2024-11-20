const WeeklyMealPlan = require('../models/WeeklyMealPlan');
const { createDailyMealPlan } = require('../repository/mealPlanRepository');
const { generateMealPlan } = require('../services/aiMealPlanService');

const createWeeklyMealPlan = async (req, res) => {
  try {
    const { age, weight, height } = req.body;

    if (!age || !weight || !height) {
      return res
        .status(400)
        .json({ message: 'Age, weight, and height are required.' });
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

    // Tạo Daily Meal Plans
    const dailyPlans = [];
    for (const day of daysOfWeek) {
      const meals = generateMealPlan(age, weight, height); // Gọi AI để sinh bữa ăn
      const dailyPlanId = await createDailyMealPlan(day, meals); // Tạo Daily Meal Plan
      dailyPlans.push(dailyPlanId); // Lưu ID của mỗi ngày
    }

    // Tạo Weekly Meal Plan
    const weeklyMealPlan = new WeeklyMealPlan({
      user: req.user._id,
      week: dailyPlans, // Tham chiếu tới DailyMealPlans
    });

    await weeklyMealPlan.save();

    res.status(201).json({
      message: 'Weekly Meal Plan created successfully.',
      weeklyMealPlan,
    });
  } catch (error) {
    console.error('Error creating weekly meal plan:', error);
    res.status(500).json({ error: error.message });
  }
};

const getMyWeeklyMealPlan = async (req, res) => {
  try {
    // Tìm Weekly Meal Plan của người dùng
    const weeklyMealPlan = await WeeklyMealPlan.findOne({
      user: req.user._id,
    }).populate({
      path: 'week', // Populate DailyMealPlan
      populate: {
        path: 'meals', // Populate Meals trong DailyMealPlan
        model: 'Meal',
      },
    });

    if (!weeklyMealPlan) {
      return res
        .status(404)
        .json({ message: 'No Weekly Meal Plan found for this user.' });
    }

    res.status(200).json({
      message: 'Weekly Meal Plan retrieved successfully.',
      weeklyMealPlan,
    });
  } catch (error) {
    console.error('Error retrieving weekly meal plan:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createWeeklyMealPlan, getMyWeeklyMealPlan };
