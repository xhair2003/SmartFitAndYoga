const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const WorkoutPlans = sequelize.define('WorkoutPlans', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    goal: {
        type: DataTypes.STRING(255),
    },
    difficulty: {
        type: DataTypes.ENUM('Beginner', 'Intermediate', 'Advanced'),
    },
    duration_weeks: {
        type: DataTypes.INTEGER,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    timestamps: true,
    tableName: 'Workout_Plans',
    underscored: true,
});

module.exports = WorkoutPlans;