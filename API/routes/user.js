'use strict';

module.exports = function (app) {

	app.get('/user/register', function (request, response) {
		var email  = request.query.email;
		var passwd = request.query.password;

		var User = require('../models/user.js').User;
		User.createUser(email, passwd, function (err, user) {
			var resp = {
				err : false
			};

			if (err) {
				resp.err = err;
			} else {
				resp.user = user;
			}
			
			response.send(resp);
		});
	});
};


