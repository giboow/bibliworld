'use strict';

module.exports = function () {
	var MongoClient = require('mongoose');
	MongoClient.connect('mongodb://127.0.0.1/bibliworld', {
			'auto_reconnect': true,
			db: {'native_parser': true},
		}, function (err) {
			if (err) {
				throw err;
			}
		}
	);
};