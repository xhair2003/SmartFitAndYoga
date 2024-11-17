const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const WorkoutExercises = sequelize.define('WorkoutExercises', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    workout_plan_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    exercise_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sets: {
        type: DataTypes.INTEGER,
        defaultValue: 3,
    },
    reps: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
    },
    rest_time_seconds: {
        type: DataTypes.INTEGER,
        defaultValue: 60,
    },
}, {
    timestamps: true,
    tableName: 'Workout_Exercises',
    underscored: true,
});

module.exports = WorkoutExercises; 