const { sequelize } = require('./models/User');
const express = require('express');
const {AuthRoutes} = require('./routes')

const app = express();

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
              `Server is running on port ${PORT}`
          );
      });
  })
  .catch((error) => {
      console.error(
          'Unable to create database tables:',
          error
      );
  });