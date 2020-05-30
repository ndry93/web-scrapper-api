const { logger } = require('../../utils/logger')(__filename);

module.exports = () => {
	async function registerURL(id) {
		logger.info('registerURL:', id);

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
		getContentByID
	};
};
