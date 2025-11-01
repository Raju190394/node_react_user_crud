const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  first_name: { type: DataTypes.STRING, allowNull: false },
  last_name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
  mobile_no: { type: DataTypes.STRING, allowNull: false },
  gender: { type: DataTypes.ENUM('Male','Female','Other'), allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false },
  photo: { type: DataTypes.STRING, allowNull: true } // stores filename or path
}, {
  tableName: 'users',
  timestamps: true
});

module.exports = User;
