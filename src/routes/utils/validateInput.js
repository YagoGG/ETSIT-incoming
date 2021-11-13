import {
	celebrator, Joi, Modes, Segments,
} from 'celebrate';
import parse from 'csv-parse';

import { AcademicPeriod, Institution, MobilityProgram } from '../../models';
import countries from '../../static/countries.json';
import languages from '../../static/languages.json';

const countryNames = countries.map((country) => country.name);
const languageNames = languages.map((language) => language.name);

async function validateAcademicPeriod(value) {
	const academicPeriodIds = (await AcademicPeriod.findAll({
		attributes: ['id'],
	})).map((period) => period.id);

	if (!academicPeriodIds.includes(value)) {
		throw new Joi.ValidationError('Unknown academic period.', [{
			message: `There is no academic period with ID ${value}`,
		}]);
	}
}

async function validateMobilityProgram(value) {
	const mobilityProgramIds = (await MobilityProgram.findAll({
		attributes: ['id'],
	})).map((program) => program.id);

	if (!mobilityProgramIds.includes(value)) {
		throw new Joi.ValidationError('Unknown mobility program.', [{
			message: `There is no mobility program with ID ${value}`,
		}]);
	}
}

async function validateInstitutionId(value) {
	const institutionIds = (await Institution.findAll({
		attributes: ['id'],
	})).map((institution) => institution.id);

	if (!institutionIds.includes(value)) {
		throw new Joi.ValidationError('Unknown institution.', [{
			message: `There is no institution with ID ${value}`,
		}]);
	}
}

async function parseInstitutionsCSV(value) {
	const parser = parse(value, {
		trim: true,
	});

	const entries = [];
	// eslint-disable-next-line no-restricted-syntax
	for await (const record of parser) {
		const [code, name] = record;

		if (record.length !== 2
			|| code === undefined
			|| code.length === 0
			|| name === undefined
			|| name.length === 0
		) throw new Error(`Bad input in row ${entries.length}`);

		entries.push({ code, name, active: true });
	}

	return entries;
}

const celebrate = celebrator({
	mode: Modes.FULL,
}, {
	abortEarly: false,
	stripUnknown: true,
});

const schemas = {
	applicationFormPersonalInfoSubmit: {
		[Segments.BODY]: {
			dateOfBirth: Joi.date().required(),
			placeOfBirth: Joi.string().valid(...countryNames).required(),
			nationality: Joi.string().valid(...countryNames).required(),
			sex: Joi.string().valid('male', 'female', 'other').required(),
			residenceAddress: Joi.string().required(),
			residenceZipCode: Joi.string().required(),
			residenceState: Joi.string().required(),
			residenceCountry: Joi.string().valid(...countryNames).required(),
			phoneNumber: Joi.string().required(),
		},
	},
	applicationFormMobilityProgramSubmit: {
		[Segments.BODY]: {
			academicPeriodId: Joi.number().integer().required()
				.external(validateAcademicPeriod),
			mobilityProgramId: Joi.number().integer().required()
				.external(validateMobilityProgram),
			fieldOfStudy: Joi.string().valid(
				'electrical-engineering',
				'computer-science',
				'biomedical-engineering',
			).required(),
			// When a checkbox is checked, its value is "on" (string). The
			// checkbox's key is not present in the request's body otherwise
			// (so we make it false by default).
			seeksDoubleDegree: Joi.boolean().truthy('on').default(false),
		},
	},
	applicationFormHomeInstitutionSubmit: {
		[Segments.BODY]: {
			homeInstitutionId: Joi.number().required()
				.external(validateInstitutionId),
			homeInstitutionSchool: Joi.string().required(),
			homeInstitutionAddress: Joi.string().required(),
			homeInstitutionCoordinatorName: Joi.string().required(),
			homeInstitutionContactName: Joi.string().required(),
			homeInstitutionContactEmail: Joi.string().email().required(),
			homeInstitutionContactPhone: Joi.string().required(),
		},
	},
	applicationFormPurposeOfStaySubmit: {
		[Segments.BODY]: {
			purposeOfStayBachelorCourses: Joi.boolean().truthy('on')
				.default(false),
			purposeOfStayMasterCourses: Joi.boolean().truthy('on')
				.default(false),
			purposeOfStayThesis: Joi.boolean().truthy('on')
				.default(false),
			purposeOfStayResearchProject: Joi.boolean().truthy('on')
				.default(false),
			purposeOfStayOther: Joi.boolean().truthy('on')
				.default(false),
			purposeOfStayOtherDetails: Joi.string().empty('').default(null),
		},
	},
	applicationFormLanguagesSubmit: {
		[Segments.BODY]: {
			motherTongue: Joi.string().valid(...languageNames).required(),
			instructionLang: Joi.string().valid(...languageNames).required(),
			otherLang1Name: Joi.string().valid(...languageNames).empty('').default(null),
			otherLang1CurrentlyStudying: Joi.boolean().truthy('on')
				.default(false),
			otherLang1CanFollow: Joi.boolean().truthy('on').default(false),
			otherLang1CanFollowExtraPrep: Joi.boolean().truthy('on')
				.default(false),
			otherLang2Name: Joi.string().empty('').default(null),
			otherLang2CurrentlyStudying: Joi.boolean().truthy('on')
				.default(false),
			otherLang2CanFollow: Joi.boolean().truthy('on').default(false),
			otherLang2CanFollowExtraPrep: Joi.boolean().truthy('on')
				.default(false),
			otherLang3Name: Joi.string().empty('').default(null),
			otherLang3CurrentlyStudying: Joi.boolean().truthy('on')
				.default(false),
			otherLang3CanFollow: Joi.boolean().truthy('on').default(false),
			otherLang3CanFollowExtraPrep: Joi.boolean().truthy('on')
				.default(false),
			otherLang4Name: Joi.string().empty('').default(null),
			otherLang4CurrentlyStudying: Joi.boolean().truthy('on')
				.default(false),
			otherLang4CanFollow: Joi.boolean().truthy('on').default(false),
			otherLang4CanFollowExtraPrep: Joi.boolean().truthy('on')
				.default(false),
			otherLang5Name: Joi.string().empty('').default(null),
			otherLang5CurrentlyStudying: Joi.boolean().truthy('on')
				.default(false),
			otherLang5CanFollow: Joi.boolean().truthy('on').default(false),
			otherLang5CanFollowExtraPrep: Joi.boolean().truthy('on')
				.default(false),
		},
	},
	applicationFormWorkExperienceSubmit: {
		[Segments.BODY]: {
			hasWorkExperience: Joi.boolean().truthy('on')
				.default(false),
			workExperienceRole: Joi.alternatives().conditional(
				'hasWorkExperience', {
					is: true,
					then: Joi.string().required(),
				},
			),
			workExperienceEmployer: Joi.alternatives().conditional(
				'hasWorkExperience', {
					is: true,
					then: Joi.string().required(),
				},
			),
			workExperienceLocation: Joi.alternatives().conditional(
				'hasWorkExperience', {
					is: true,
					then: Joi.string().required(),
				},
			),
			workExperienceStartDate: Joi.alternatives().conditional(
				'hasWorkExperience', {
					is: true,
					then: Joi.date().required(),
				},
			),
			workExperienceEndDate: Joi.alternatives().conditional(
				'hasWorkExperience', {
					is: true,
					then: Joi.date().required(),
				},
			),
		},
	},
	login: {
		[Segments.BODY]: {
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		},
	},
	nominateUsers: {
		[Segments.BODY]: {
			emails: Joi.string().email({
				multiple: true,
				separator: ',\n',
			}).trim().required(),
		},
	},
	registrationFormSubmit: {
		[Segments.BODY]: {
			firstName: Joi.string().required(),
			lastName: Joi.string().required(),
			email: Joi.string().email().required(),
			password: Joi.string().min(8).required(),
		},
	},
	registrationFormView: {
		[Segments.BODY]: {
			email: Joi.string().email().required(),
			token: Joi.string().required(),
		},
	},
	updateInstitutions: {
		[Segments.BODY]: {
			institutions: Joi.string().trim().required()
				.external(parseInstitutionsCSV),
		},
	},
};

const proxy = new Proxy(schemas, {
	get: (object, key) => {
		if (!(key in object)) throw new Error(`"${key}" is not a valid schema`);
		return celebrate(object[key]);
	},
});

export default proxy;
