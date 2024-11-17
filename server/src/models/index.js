const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const WorkoutPlans = require('./WorkoutPlans');
const Exercises = require('./Exercises');
const WorkoutExercises = require('./WorkoutExercises');
// const NutritionPlans = require('./NutritionPlans');
// const Foods = require('./Foods');
// const NutritionPlanFoods = require('./NutritionPlanFoods');
// const ProgressTracking = require('./ProgressTracking');
// const Recommendations = require('./Recommendations');
const User = require('./User');

// // Relationships

// User.hasMany(WorkoutPlans, { foreignKey: 'user_id' });
// WorkoutPlans.belongsTo(User, { foreignKey: 'user_id' });

// User.hasMany(NutritionPlans, { foreignKey: 'user_id' });
// NutritionPlans.belongsTo(User, { foreignKey: 'user_id' });

WorkoutPlans.hasMany(WorkoutExercises, { foreignKey: 'workout_plan_id' });
WorkoutExercises.belongsTo(WorkoutPlans, { foreignKey: 'workout_plan_id' });

Exercises.hasMany(WorkoutExercises, { foreignKey: 'exercise_id' });
WorkoutExercises.belongsTo(Exercises, { foreignKey: 'exercise_id' });

// NutritionPlans.hasMany(NutritionPlanFoods, { foreignKey: 'nutrition_plan_id' });
// NutritionPlanFoods.belongsTo(NutritionPlans, { foreignKey: 'nutrition_plan_id' });

// Foods.hasMany(NutritionPlanFoods, { foreignKey: 'food_id' });
// NutritionPlanFoods.belongsTo(Foods, { foreignKey: 'food_id' });

// User.hasMany(ProgressTracking, { foreignKey: 'user_id' });
// ProgressTracking.belongsTo(User, { foreignKey: 'user_id' });

// User.hasMany(Recommendations, { foreignKey: 'user_id' });
// Recommendations.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
    User,
    sequelize,
    WorkoutPlans,
    Exercises,
    WorkoutExercises,
    // NutritionPlans,
    // Foods,
    // NutritionPlanFoods,
    // ProgressTracking,
    // Recommendations,
};