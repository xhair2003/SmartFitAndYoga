const { sequelize } = require('../models');

const getConnection = () => {
    try {
        sequelize
        .sync()
        .then(() => {
            console.log('Db is connected');
        })
        .catch((error) => {
            console.log('Failed to connect to db:', error);
        });
    }
    catch (error) {
        console.log(error.message);
    }
};

module.exports = getConnection;

