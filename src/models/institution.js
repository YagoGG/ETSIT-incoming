import Sequelize from 'sequelize';

import sequelize from './db';

const { Model, DataTypes } = Sequelize;

export default class Institution extends Model {}

Institution.init({
	code: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	active: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		default: true,
	},
}, { sequelize });
