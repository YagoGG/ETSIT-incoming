const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const { sequelize } = require('.');

const env = process.env.NODE_ENV || 'development';
const config = require('../../config.json')[env];

class User extends Model {
	static hashPassword(password) {
		return bcrypt.hash(password, config.server.passwordSaltRounds);
	}

	verifyPassword(password) {
		return bcrypt.compare(password, this.password);
	}
}

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
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING,
	},
}, { sequelize });

const hashPasswordHook = async (user) => {
	if (!user.changed('password')) return;
	const hash = await User.hashPassword(user.password);
	await user.set('password', hash);
};
User.beforeCreate(hashPasswordHook);
User.beforeUpdate(hashPasswordHook);

module.exports = User;
