import Sequelize from 'sequelize';

import sequelize from './db';

const { Model, DataTypes } = Sequelize;

export default class Application extends Model {
	static get SEX_MALE() {
		return 'male';
	}

	static get SEX_FEMALE() {
		return 'female';
	}

	static get SEX_OTHER() {
		return 'other';
	}
}

Application.init({
	dateOfBirth: {
		type: DataTypes.DATEONLY,
	},
	placeOfBirth: {
		type: DataTypes.STRING,
	},
	nationality: {
		type: DataTypes.STRING,
	},
	sex: {
		type: DataTypes.ENUM,
		values: [
			Application.SEX_MALE,
			Application.SEX_FEMALE,
			Application.SEX_OTHER,
		],
	},
	residenceAddress: {
		type: DataTypes.STRING,
	},
	residenceState: {
		type: DataTypes.STRING,
	},
	residenceZipCode: {
		type: DataTypes.STRING,
	},
	residenceCountry: {
		type: DataTypes.STRING,
	},
	phoneNumber: {
		type: DataTypes.STRING,
	},
}, { sequelize });
