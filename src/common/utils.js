const axios = require('axios');
const cheerio = require('cheerio');

const { logger } = require('./logger')(__filename);

// Add a request interceptor
axios.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		console.log('++++++++++++++config ', config);
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Add a response interceptor
axios.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error);
	}
);

const requestConfig = {
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
	},
	// deployed in heroku automatically send transformRequest: [null] that produce err somehow
	transformRequest: [
		function (data, headers) {
			// Do whatever you want to transform the data

			return data;
		},
	],
	transformResponse: [
		function (data) {
			// Do whatever you want to transform the data

			return data;
		},
	],
	maxContentLength: -1,
	timeout: 60000, // timeout in 1 min
};

async function fetchHTML(url) {
	logger.info('fetchHTML:', url);
	try {
		const { data } = await axios.get(url, requestConfig);

		// logger.info('fetchHTML data:', data);
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
	getCurrentTimestamp,
};
