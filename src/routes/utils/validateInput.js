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
};

const proxy = new Proxy(schemas, {
	get: (object, key) => celebrate(object[key]),
});

export default proxy;
