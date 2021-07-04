/* eslint-disable no-console */
import register from '@react-ssr/express/register';

import configFile from '../config.json';

import app from './app';

const env = process.env.NODE_ENV || 'development';
const config = configFile[env];

(async () => {
	// This adds to Express the template engine we use for server-side rendering
	// React views.
	await register(app);

	// react-ssr's JSX render engine does not preserve res.locals in the
	// view, which means that flash messages (req.flash(...)) are not be
	// available in the React views.
	// To avoid this issue, we monkey-patch the render engine so that the
	// options passed to each view are BOTH the props specified in
	// res.render(...) AND the contents of res.locals.
	// You should not need to modify this; it is just a small hack to make
	// react-ssr's renderer comply with the usual behaviour of passing
	// res.locals to the views.
	const originalEngine = app.engines['.jsx'];
	app.engines['.jsx'] = (file, options, cb) => {
		const optionsWithInjectedLocals = {
			...options,
			props: {
				...options.props,
				// eslint-disable-next-line no-underscore-dangle
				...options._locals,
			},
		};
		return originalEngine(file, optionsWithInjectedLocals, cb);
	};

	app.listen(config.server.port, () => {
		console.log('ETSIT-incoming');
		console.log('==============');
		console.log(`App listening at port ${config.server.port}...`);
	});
})();
