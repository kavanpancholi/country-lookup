const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

sequelize
  .authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
