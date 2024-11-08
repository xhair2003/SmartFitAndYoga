const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define(
    'User',
    {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        timestamps: true,
        tableName: 'Users',
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

module.exports = User;