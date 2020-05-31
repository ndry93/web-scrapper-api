const { logger } = require('../../common/logger')(__filename);

module.exports = options => {
	const { utils, db } = options;

	async function testRenderURL(url) {
		const $ = await utils.fetchHTML(url);
		return $.html();
	}

	async function registerURL(id, url) {
		logger.info('registerURL:', url, ' with id:', id);

		try {
			const $ = await utils.fetchHTML(url);

			const insertData = {
				id,
				url,
				web_content: $.html(),
				created_timestamp: utils.getCurrentTimestamp()
			};
			const pouchResp = await db.create(insertData);

			logger.info(pouchResp);

			if (pouchResp.ok) {
				return {
					status: 'success',
					id: pouchResp.id,
					created_timestamp: pouchResp.created_timestamp
				};
			}
		} catch (error) {
			logger.error('error on registerURL with error ', error);
		}
		return {
			status: 'fail',
			error_message: 'failed registering the url'
		};
	}

	async function deleteURL(id) {
		logger.info('deleteURL:', id);

		const respObj = {
			status: 'success'
		};

		const resp = await Promise.resolve(respObj);
		return resp;
	}

	async function getAll() {
		logger.info('getAll');
		const pouchResp = await db.getAll();

		try {
			if (pouchResp) {
				const records = [];
				pouchResp.rows.forEach(element => {
					const tempData = {
						id: element.id,
						url: element.doc.url,
						created_timestamp: element.doc.created_timestamp
					};
					records.push(tempData);
				});

				return {
					status: 'success',
					records
				};
			}
		} catch (error) {
			logger.error('error on getAll with error ', error);
		}
		return {
			status: 'fail',
			error_message: 'failed fetching contents'
		};
	}

	async function getContentByID(id) {
		logger.info('getContentByID:', id);

		const pouchResp = await db.get(id);
		try {
			if (pouchResp) {
				return {
					status: 'success',
					id,
					url: pouchResp.url,
					web_content: pouchResp.web_content,
					created_timestamp: pouchResp.created_timestamp
				};
			}
		} catch (error) {
			logger.error('error on getContentByID with error ', error);
		}
		return {
			status: 'fail',
			error_message: `failed fetching content id ${id}`
		};
	}

	return {
		registerURL,
		deleteURL,
		getContentByID,
		testRenderURL,
		getAll
	};
};
