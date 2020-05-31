const logger = require('pino')();

function initLogger(sourceName) {
	// log thru child to display application name, sourceName (related file), and many more
	const child = logger.child({
		application: 'web-scrapper-api',
		sourceName
	});
	if (process.env.NODE_ENV === 'production') {
		child.level = 'error';
	} else {
		child.level = 'info';
	}
	child.info('web-scrapper-api logger start ', child.level);

	return {
		logger: child
	};
}
module.exports = initLogger;
