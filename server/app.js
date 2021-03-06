const Koa = require('koa');
const helmet = require('koa-helmet');
const cors = require('@koa/cors');
const morgan = require('koa-morgan');
const Sentry = require('@sentry/node');
const bodyParser = require('koa-bodyparser');
const config = require('../src/config');
const { logger } = require('../src/common/logger')(__filename);

// init KoaJs
const app = new Koa();

// mount config to app
app.config = config;

// init Sentry if Dsn configured
if (app.config.SENTRY_PROJECT_DSN) {
	Sentry.init({ dsn: app.config.SENTRY_PROJECT_DSN });
}

// middleware
const customDomainHandler = require('../src/middleware/customDomainHandler');
const errorHandler = require('../src/middleware/errorHandler');
// apply middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(customDomainHandler());
app.use(errorHandler());
app.use(bodyParser());

// cors header
const options = {
	origin: app.config.FE_BASE_URL
};
app.use(cors(options));

app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(async (ctx, next) => {
	await next();
	ctx.assert.equal('object', typeof ctx, 500, 'something went wrong');
});

const applyRouter = require('../src/api');

applyRouter(app);

// onError listener
app.on('error', (error, ctx) => {
	if (app.config.env === 'production') {
		Sentry.captureException(error);
		logger.error(error);
	} else {
		logger.info(error);
	}

	ctx.status = 500;
	ctx.body = {
		message: error.message
	};
});

module.exports = app;
