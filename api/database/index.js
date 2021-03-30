const { Sequelize } = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize(
  'nature_goods',
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: '127.0.0.1',
    dialect: 'mysql',
  }
);

module.exports = sequelize;
