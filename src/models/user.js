const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('.');

class User extends Model {}
User.init({
	email: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
		validate: {
			isEmail: true,
		},
	},
	// This contains both the salt and the password's hash itself.
	passwordHash: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING,
	},
}, { sequelize });

module.exports = User;
