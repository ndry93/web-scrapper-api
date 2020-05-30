/* eslint-disable global-require */
const scraperService = require('./scraper.service')({
	utils: require('../../common/utils')()
});

// controller function takes option argument
const controller = require('./scraper.controller')({
	scraperService
});

module.exports = require('./scraper.routes')(controller);
