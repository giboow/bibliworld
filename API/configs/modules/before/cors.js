'use strict';
module.exports = function (app) {
	var cors = require('cors');

	var corsOptions = {
		credentials: true,
		origin: function (origin, callback) {
			if (origin === undefined) {
				callback(null, false);
			} else {
				// change wordnik.com to your allowed domain.
				var match = origin.match('^(.*)?.localhost(:[0-9]+)?');
				var allowed = (match !== null && match.length > 0);
				callback(null, allowed);
			}
		}
	};

	app.use(cors(corsOptions));
};
