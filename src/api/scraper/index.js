const scraperService = require('./scraper.service')({
	// db: require("../../../src/utils/db")
});

// controller function takes option argument
const controller = require('./scraper.controller')({
	scraperService
});

module.exports = require('./scraper.routes')(controller);
