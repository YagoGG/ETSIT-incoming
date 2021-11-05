import Sequelize from 'sequelize';

import sequelize from './db';

const { Model, DataTypes } = Sequelize;

export default class AcademicPeriod extends Model {}

AcademicPeriod.init({
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	active: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	},
}, { sequelize });
