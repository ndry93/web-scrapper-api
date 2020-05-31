/* eslint-disable global-require */
const scraperService = require('./scraper.service')({
	utils: require('../../common/utils'),
	db: require('../../common/db')
});

// controller function takes option argument
const controller = require('./scraper.controller')({
	scraperService
});

module.exports = require('./scraper.routes')(controller);
