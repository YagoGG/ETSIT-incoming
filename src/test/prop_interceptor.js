import path from 'path';

/**
 * Jest cannot test both server and JSX code, so it is not possible to make a
 * full integration test with the actual React views.
 *
 * This function adds a mocked JSX template engine that, instead of returning
 * the corresponding React document, it produces a JSON with the following
 * structure:
 *
 * 	{
 * 		"view": "path/to/the/view/to/render",
 * 		"props": { ... }
 * 	}
 *
 * Where "view" is the path to the view that has invoked the template engine
 * (just as you would put it in res.render(...)); and where "props" is an
 * object with all the props passed to the view.
 */
export default function interceptJSXRenderProps(app) {
	const viewsPath = path.join(__dirname, '../views/');
	app.engine('jsx', (filePath, options, callback) => {
		const {
			settings, _locals, cache, ...props
		} = options;
		callback(null, {
			view: filePath.replace(viewsPath, '').replace(/\.jsx$/, ''),
			props: { ...props, ..._locals },
		});
	});

	app.set('views', viewsPath);
	app.set('view engine', 'jsx');
}
