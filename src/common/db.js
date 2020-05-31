const PouchDB = require('pouchdb');

const db = new PouchDB('db-web-scrapper-api');

const { logger } = require('./logger')(__filename);

function create(data) {
	return db
		.put({
			_id: data.id,
			url: data.url,
			web_content: data.web_content,
			created_timestamp: data.created_timestamp
		})
		.then(function(response) {
			logger.info(response);
			return response;
		})
		.catch(function(err) {
			logger.error(err);
		});
}

function get(id) {
	return db
		.get(id)
		.then(function(response) {
			logger.info(response);
			return response;
		})
		.catch(function(err) {
			logger.error(err);
		});
}

function getAll() {
	return db
		.allDocs({
			include_docs: true,
			attachments: true
		})
		.then(function(response) {
			// handle result
			logger.info(response);
			return response;
		})
		.catch(function(err) {
			console.log(err);
		});
}

function remove(id) {
	return db
		.remove(id)
		.then(function(response) {
			logger.info(response);
			return response;
		})
		.catch(function(err) {
			logger.error(err);
		});
}

module.exports = {
	create,
	get,
	remove,
	getAll
};

module.exports.destroy = function() {
	new PouchDB('db-web-scrapper-api')
		.destroy()
		.then(function() {
			// database destroyed
			console.log('destroyed!');
		})
		.catch(function(err) {
			console.log(err);
		});
};
