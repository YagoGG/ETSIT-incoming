import {
	celebrator, Joi, Modes, Segments,
} from 'celebrate';

const celebrate = celebrator({
	mode: Modes.FULL,
}, {
	abortEarly: false,
	stripUnknown: true,
});

const schemas = {
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
