const { logger } = require('../../common/logger')(__filename);

module.exports = options => {
	const { utils } = options;

	async function testRenderURL(url) {
		const $ = await utils.fetchHTML(url);
		return $.html();
	}

	async function registerURL(id, url) {
		logger.info('registerURL:', url, ' with id:', id);

		const $ = await utils.fetchHTML(url);

		// Print the full HTML
		console.log(`Site HTML: ${$.html()}\n\n`);

		const respObj = {
			status: 'success',
			id: '110'
		};

		const resp = await Promise.resolve(respObj);
		return resp;
	}

	async function deleteURL(id) {
		logger.info('deleteURL:', id);

		const respObj = {
			status: 'success'
		};

		const resp = await Promise.resolve(respObj);
		return resp;
	}

	async function getContentByID(id) {
		logger.info('getContentByID:', id);

		const respObj = {
			status: 'success',
			web_content: '',
			id: ''
		};

		const resp = await Promise.resolve(respObj);
		return resp;
	}

	return {
		registerURL,
		deleteURL,
		getContentByID,
		testRenderURL
	};
};
