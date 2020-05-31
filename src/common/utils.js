const axios = require('axios');
const cheerio = require('cheerio');

async function fetchHTML(url) {
	const { data } = await axios.get(url);
	return cheerio.load(data);
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
