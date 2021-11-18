import Sequelize from 'sequelize';

import sequelize from './db';

const { Model, DataTypes } = Sequelize;

export default class Subject extends Model {}

Subject.init({
	code: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		unique: true,
	},
	nameNative: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	nameEnglish: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	ects: {
		type: DataTypes.FLOAT,
		allowNull: false,
	},
	active: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	},
}, { sequelize });
