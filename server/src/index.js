const express = require('express');
const cors = require('cors');
const { corsOptions } = require('./utils/corsOptions');
//const { limiter } = require('./utils/rateLimiter');
const getConnection = require('./utils/getConnection');
const createError = require('http-errors');
const { 
    AuthRoutes,
    WorkoutPlansRoutes,
    
} = require('./routes');

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
//app.use(express.urlencoded({ extended: true, limit: '50mb' }));
//app.use(limiter);


app.use('/api/auth', AuthRoutes);
app.use('/api/workout-plans', WorkoutPlansRoutes);


app.use((req, res, next) => {
    next(createError.NotFound('This route does not exist'));
});


app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
});


getConnection();
app.listen(process.env.PORT, () => {
    console.log(
        `SmartFit server is running on port ${process.env.PORT}`
    );
});

