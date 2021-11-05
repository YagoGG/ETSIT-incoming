import {
	celebrator, Joi, Modes, Segments,
} from 'celebrate';

import countries from '../../static/countries.json';

const countryNames = countries.map((country) => country.name);

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
};

const proxy = new Proxy(schemas, {
	get: (object, key) => {
		if (!(key in object)) throw new Error(`"${key}" is not a valid schema`);
		return celebrate(object[key]);
	},
});

export default proxy;
