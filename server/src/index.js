const express = require('express');
const createError = require('http-errors');
const PORT = process.env.PORT || 3000;
const Auth = require('./routes/Auth');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(morgan('dev'));
//app.use('/api/auth', AuthController);

app.use((req, res, next) => {
    next(createError.NotFound('This route does not exist'));
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    // sequelize
    //     .sync()
    //     .then(() => {
    //         console.log('Database & tables created!');
    //     })
    //     .catch((error) => {
    //         console.error('Unable to create database tables:', error);
    //     });
});