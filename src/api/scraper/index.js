/* eslint-disable global-require */

/**
 * Endpoint constructed with Dependency Injection pattern
 * Test script can simply `stub` any layer like service, utils, db, and etc..
 */

// service function takes option argument
const scraperService = require('./scraper.service')({
	utils: require('../../common/utils'),
	db: require('../../common/db')
});

const controller = require('./scraper.controller')({
	scraperService
});

module.exports = require('./scraper.routes')(controller);
