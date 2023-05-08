const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.ead, process.env.Alan, process.env.Alan, {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql'
});

module.exports = sequelize;