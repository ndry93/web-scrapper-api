const { v4: uuidv4 } = require('uuid');
const { logger } = require('../../common/logger')(__filename);

module.exports = services => {
	async function getAll(ctx) {
		const { request, response } = ctx;
		logger.info('getAll');

		const data = await services.scraperService.getAll();

		if (data.status !== 'success') {
			response.status = 500;
			// ctx.throw(404, 'id is invalid');
			// dont want to use throw because some cases requires custom body on error response

			ctx.body = {
				data: {
					status: data.status,
					error_message: data.error_message
				}
			};
		} else {
			response.status = 200;
			ctx.body = {
				data: {
					status: data.status,
					records: data.records
				}
			};
		}
	}

	async function getContentByID(ctx) {
		const { request, response } = ctx;
		const { id } = request.params;
		logger.info('getContentByID:', id);

		const data = await services.scraperService.getContentByID(id);

		if (data.status !== 'success') {
			response.status = 500;
			// ctx.throw(404, 'id is invalid');
			// dont want to use throw because some cases requires custom body on error response

			ctx.body = {
				data: {
					status: data.status,
					error_message: data.error_message
				}
			};
		} else {
			response.status = 200;
			ctx.body = {
				data: {
					status: data.status,
					error_message: data.error_message,
					web_content: data.web_content,
					id: data.id,
					created_timestamp: data.created_timestamp
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
		const id = uuidv4();

		logger.info('registerURL:', requestBody.url);
		const data = await services.scraperService.registerURL(id, requestBody.url);

		if (data.status !== 'success') {
			logger.error('error while registering URL with message:', data.error_message);
			response.status = 500;
			ctx.body = {
				data: {
					status: data.status,
					error_message: data.error_message
				}
			};
		} else {
			response.status = 200;
			ctx.body = {
				data: {
					id: data.id,
					status: data.status,
					created_timestamp: data.created_timestamp,
					error_message: data.error_message
				}
			};
		}
	}

	async function testRenderURL(ctx) {
		const { response, query } = ctx;
		const data = await services.scraperService.testRenderURL(query.url);
		response.status = 200;
		ctx.body = data;
	}

	return {
		getAll,
		getContentByID,
		deleteURL,
		registerURL,
		testRenderURL
	};
};
