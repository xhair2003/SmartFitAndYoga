const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define(
    'User',
    {
        // user_id: {
        //     type: DataTypes.INTEGER,
        //     autoIncrement: true,
        //     primaryKey: true,
        // },
        email: {
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        // is_active: {
        //     type: DataTypes.BOOLEAN,
        //     defaultValue: true,
        // },
        // is_verified: {
        //     type: DataTypes.BOOLEAN,
        //     defaultValue: false,
        // },
        // last_login: {
        //     type: DataTypes.DATE,
        // },
        // reset_password_token: {
        //     type: DataTypes.STRING(255),
        // },
        // reset_password_expires_at: {
        //     type: DataTypes.DATE,
        // },
        // verification_token: {
        //     type: DataTypes.STRING(255),
        // },
        // verification_token_expires_at: {
        //     type: DataTypes.DATE,
        // },
        // created_at: {
        //     type: DataTypes.DATE,
        //     defaultValue: DataTypes.NOW,
        // },
        // updated_at: {
        //     type: DataTypes.DATE,
        //     defaultValue: DataTypes.NOW,
        //     onUpdate: DataTypes.NOW,
        // },
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