const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = require('./User');

module.exports = {
    User,
    sequelize,
};