import bcrypt from 'bcrypt';
import Sequelize from 'sequelize';

import configFile from '../../config.json';

import sequelize from './db';

const { Model, DataTypes } = Sequelize;

const env = process.env.NODE_ENV || 'development';
const config = configFile[env];

export default class User extends Model {
	static get STUDENT_ROLE() {
		return 'student';
	}

	static get ADMIN_ROLE() {
		return 'admin';
	}

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
	role: {
		type: DataTypes.ENUM,
		values: [User.STUDENT_ROLE, User.ADMIN_ROLE],
		defaultValue: User.STUDENT_ROLE,
		allowNull: false,
	},
}, { sequelize });

const hashPasswordHook = async (user) => {
	if (!user.changed('password')) return;
	const hash = await User.hashPassword(user.password);
	await user.set('password', hash);
};
User.beforeCreate(hashPasswordHook);
User.beforeUpdate(hashPasswordHook);
