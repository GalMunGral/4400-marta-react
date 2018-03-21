const Sequelize = require('sequelize');

const sequelize = new Sequelize('marta', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  password: Sequelize.STRING,
  isAdmin: Sequelize.BOOLEAN
}, {
  timestamps: false,
  freezeTableName: true,
});

module.exports = { User };
