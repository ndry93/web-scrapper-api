/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const Router = require('koa-joi-router');

const docs = require('../docs');

const { logger } = require('../utils/logger')(__filename);

const scraper = require('./scraper')(Router);

function applyApiMiddleware(app) {
	// API main routes
	const mainRouter = Router();
	mainRouter.prefix('/api');
	// sub routes
	mainRouter.use(scraper.middleware());

	docs.addDocsForRouter(scraper);

	mainRouter.route(docs.getRoutesForSpec(docs.generateSpec()));

	logger.info('router initiated ', mainRouter);
	app.use(mainRouter.middleware());
	app.use(mainRouter.router.allowedMethods());
}

module.exports = applyApiMiddleware;
