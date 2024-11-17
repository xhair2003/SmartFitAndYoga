const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Exercises = sequelize.define('Exercises', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    muscle_group: {
        type: DataTypes.STRING(255),
    },
    equipment_required: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    difficulty: {
        type: DataTypes.ENUM('Beginner', 'Intermediate', 'Advanced'),
    },
    video_url: {
        type: DataTypes.STRING(255),
    },
}, {
    timestamps: true,
    tableName: 'Exercises',
    underscored: true,
});

module.exports = Exercises; 