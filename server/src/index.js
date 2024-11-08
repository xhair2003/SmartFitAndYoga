const { sequelize } = require('./models');
const express = require('express');
const cors = require('cors');
const { corsOptions } = require('./utils/corsOptions');
const {AuthRoutes} = require('./routes')

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
//app.use(morgan('dev'));
app.use('/api/auth', AuthRoutes);

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

const PORT = process.env.PORT || 3000;

sequelize
  .sync()
  .then(() => {
      console.log('Database & tables created!');

      app.listen(PORT, () => {
          console.log(
              `SmartFit server is running on port ${PORT}`
          );
      });
  })
  .catch((error) => {
      console.error(
          'Unable to create database tables:',
          error
      );
  });