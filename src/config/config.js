/**
 * Rules
 * - database table name should not contain environment name
 * - base url should not have trailing slash (not recommended: http://localhost:8080/ , recommended: http://localhost:8080)
 * - process.env should not be called outside this configuration file
 */

require(`dotenv`).config();

const env = process.env.NODE_ENV || 'development';

const configs = {
	development: {
		env,
		PORT: 3000,
		SENTRY_PROJECT_DSN: '',
		FE_BASE_URL: 'http://localhost:4200'
		// TO-DO: add development environment variables
	},
	staging: {
		env,
		PORT: 3000,
		SENTRY_PROJECT_DSN: '',
		FE_BASE_URL: 'http://localhost:4200'
		// TO-DO: add staging environment variables
	},
	production: {
		env,
		PORT: process.env.PORT || 80,
		SENTRY_PROJECT_DSN: '',
		FE_BASE_URL: 'https://product-showcase-ui.herokuapp.com'
		// TO-DO: add production environment variables
	}
};

const configObj = configs[env];

// https://nodejs.org/api/modules.html#module_caching
// Caching Modules are cached after the first time they are loaded.
// This means (among other things) that every call to require('foo') will get exactly the same object returned,
// if it would resolve to the same file.
// Multiple calls to require('foo') may not cause the module code to be executed multiple times.
// This is an important feature. With it, "partially done" objects can be returned,
// thus allowing transitive dependencies to be loaded even when they would cause cycles.
// If you want to have a module execute code multiple times, then export a function, and call that function.
module.exports = configObj;
