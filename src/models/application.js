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

	static get FIELD_STUDY_EE() {
		return 'electrical-engineering';
	}

	static get FIELD_STUDY_CS() {
		return 'computer-science';
	}

	static get FIELD_STUDY_BIO() {
		return 'biomedical-engineering';
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
	fieldOfStudy: {
		type: DataTypes.ENUM,
		values: [
			Application.FIELD_STUDY_CS,
			Application.FIELD_STUDY_EE,
			Application.FIELD_STUDY_BIO,
		],
	},
	seeksDoubleDegree: {
		type: DataTypes.BOOLEAN,
	},
	homeInstitutionSchool: {
		type: DataTypes.STRING,
	},
	homeInstitutionAddress: {
		type: DataTypes.STRING,
	},
	homeInstitutionCoordinatorName: {
		type: DataTypes.STRING,
	},
	homeInstitutionContactName: {
		type: DataTypes.STRING,
	},
	homeInstitutionContactEmail: {
		type: DataTypes.STRING,
	},
	homeInstitutionContactPhone: {
		type: DataTypes.STRING,
	},
}, { sequelize });
