const { logger } = require('../../utils/logger')(__filename);

module.exports = services => {
	async function getContentByID(ctx) {
		const { request, response } = ctx;
		const { id } = request.params;
		logger.info('getContentByID:', id);

		const data = await services.scraperService.getContentByID(id);

		if (data.status !== 'success') {
			response.status = 404;
			// ctx.throw(404, 'id is invalid');
			// dont want to use throw because some cases requires custom body on error response

			ctx.body = {
				data: {
					status: data.status,
					error_message: data.message,
					web_content: data.web_content
				}
			};
		} else {
			response.status = 200;
			ctx.body = {
				data: {
					status: data.status,
					error_message: data.message,
					web_content: data.web_content
				}
			};
		}
	}

	async function deleteURL(ctx) {
		const { request, response } = ctx;
		const requestBody = request.body;
		logger.info('deleteURL:', requestBody.url);

		const data = await services.scraperService.registerURL(requestBody.url);
		if (data.status !== 'success') {
			logger.error('error while removing URL with message:', data.message);
			response.status = 500;
			ctx.body = {
				data: {
					status: data.status,
					error_message: data.message
				}
			};
		} else {
			response.status = 200;
			ctx.body = {
				data: {
					status: data.status,
					error_message: data.message
				}
			};
		}
	}

	async function registerURL(ctx) {
		const { request, response } = ctx;
		const requestBody = request.body;
		logger.info('registerURL:', requestBody.url);

		const data = await services.scraperService.registerURL(requestBody.url);
		if (data.status !== 'success') {
			logger.error('error while registering URL with message:', data.message);
			response.status = 500;
			ctx.body = {
				data: {
					status: data.status,
					error_message: data.message
				}
			};
		} else {
			response.status = 200;
			ctx.body = {
				data: {
					id: data.id,
					status: data.status,
					error_message: data.message
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
