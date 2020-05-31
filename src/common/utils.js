const axios = require('axios');
const cheerio = require('cheerio');

const { logger } = require('./logger')(__filename);

const requestConfig = {
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	},
	timeout: 60000 // timeout in 1 min
};

async function fetchHTML(url) {
	logger.info('fetchHTML:', url);
	try {
		const { data } = await axios.get(url, requestConfig);
		logger.info('fetchHTML data:', data);
		const result = cheerio.load(data);
		logger.info('fetchHTML cheerio:', result);
		return result;
	} catch (error) {
		logger.error('fetchHTML error:', error);
	}
	return null;
}

function getCurrentTimestamp() {
	const date = new Date();
	const timestamp = date.getTime();
	return timestamp;
}

module.exports = {
	fetchHTML,
	getCurrentTimestamp
};
