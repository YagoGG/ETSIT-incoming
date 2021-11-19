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
	purposeOfStayBachelorCourses: {
		type: DataTypes.BOOLEAN,
	},
	purposeOfStayMasterCourses: {
		type: DataTypes.BOOLEAN,
	},
	purposeOfStayThesis: {
		type: DataTypes.BOOLEAN,
	},
	purposeOfStayResearchProject: {
		type: DataTypes.BOOLEAN,
	},
	purposeOfStayOther: {
		type: DataTypes.BOOLEAN,
	},
	purposeOfStayOtherDetails: {
		type: DataTypes.STRING,
	},
	motherTongue: {
		type: DataTypes.STRING,
	},
	instructionLang: {
		type: DataTypes.STRING,
	},
	otherLang1Name: {
		type: DataTypes.STRING,
	},
	otherLang1CurrentlyStudying: {
		type: DataTypes.BOOLEAN,
	},
	otherLang1CanFollow: {
		type: DataTypes.BOOLEAN,
	},
	otherLang1CanFollowExtraPrep: {
		type: DataTypes.BOOLEAN,
	},
	otherLang2Name: {
		type: DataTypes.STRING,
	},
	otherLang2CurrentlyStudying: {
		type: DataTypes.BOOLEAN,
	},
	otherLang2CanFollow: {
		type: DataTypes.BOOLEAN,
	},
	otherLang2CanFollowExtraPrep: {
		type: DataTypes.BOOLEAN,
	},
	otherLang3Name: {
		type: DataTypes.STRING,
	},
	otherLang3CurrentlyStudying: {
		type: DataTypes.BOOLEAN,
	},
	otherLang3CanFollow: {
		type: DataTypes.BOOLEAN,
	},
	otherLang3CanFollowExtraPrep: {
		type: DataTypes.BOOLEAN,
	},
	otherLang4Name: {
		type: DataTypes.STRING,
	},
	otherLang4CurrentlyStudying: {
		type: DataTypes.BOOLEAN,
	},
	otherLang4CanFollow: {
		type: DataTypes.BOOLEAN,
	},
	otherLang4CanFollowExtraPrep: {
		type: DataTypes.BOOLEAN,
	},
	otherLang5Name: {
		type: DataTypes.STRING,
	},
	otherLang5CurrentlyStudying: {
		type: DataTypes.BOOLEAN,
	},
	otherLang5CanFollow: {
		type: DataTypes.BOOLEAN,
	},
	otherLang5CanFollowExtraPrep: {
		type: DataTypes.BOOLEAN,
	},
	hasWorkExperience: {
		type: DataTypes.BOOLEAN,
	},
	workExperienceRole: {
		type: DataTypes.STRING,
	},
	workExperienceEmployer: {
		type: DataTypes.STRING,
	},
	workExperienceLocation: {
		type: DataTypes.STRING,
	},
	workExperienceStartDate: {
		type: DataTypes.DATEONLY,
	},
	workExperienceEndDate: {
		type: DataTypes.DATEONLY,
	},
	currentStudiesName: {
		type: DataTypes.STRING,
	},
	currentStudiesYear: {
		type: DataTypes.INTEGER,
	},
	currentStudiesSpecialisation: {
		type: DataTypes.STRING,
	},
	hasStudiedAbroad: {
		type: DataTypes.BOOLEAN,
	},
	abroadStudiesInstitution: {
		type: DataTypes.STRING,
	},
	abroadStudiesLocation: {
		type: DataTypes.STRING,
	},
}, { sequelize });
