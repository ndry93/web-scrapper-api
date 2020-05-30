const { logger } = require('../../utils/logger')(__filename);

module.exports = services => {
	async function getContentByID(ctx) {
		const { request, response } = ctx;
		const { id } = request.params;
		logger.info('getContentByID:', id);

		const data = services.scraperService.getContentByID(id);

		if (data.status !== 'success') {
			response.status = 404;
			ctx.throw(404, 'id is invalid');
		}

		response.status = 200;
		ctx.body = {
			data: data.web_content
		};
	}

	async function deleteURL(ctx) {
		const { request, response } = ctx;
		const requestBody = request.body;
		logger.info('deleteURL:', requestBody.url);

		const data = services.scraperService.registerURL(requestBody.url);
		if (data.status !== 'success') {
			logger.error('error while removing URL with message:', data.message);
			response.status = 500;
			ctx.body = {
				data: {
					status: data.status,
					message: data.message
				}
			};
		} else {
			response.status = 200;
			ctx.body = {
				data: {
					status: data.status,
					message: data.message
				}
			};
		}
	}

	async function registerURL(ctx) {
		const { request, response } = ctx;
		const requestBody = request.body;
		logger.info('registerURL:', requestBody.url);

		const data = services.scraperService.registerURL(requestBody.url);
		if (data.status !== 'success') {
			logger.error('error while registering URL with message:', data.message);
			response.status = 500;
			ctx.body = {
				data: {
					status: data.status,
					message: data.message
				}
			};
		} else {
			response.status = 200;
			ctx.body = {
				data: {
					id: data.id,
					status: data.status,
					message: data.message
				}
			};
		}
	}

	return {
		getContentByID,
		deleteURL,
		registerURL
	};
};
