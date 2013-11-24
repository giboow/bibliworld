'use strict';

module.exports = function (app) {

	var passport = require('passport');

	app.get('/login',  passport.authenticate('local'), function (request, response) {
		request.login(request.query.username, function (err) {
			response.send({
				realname : 'Philou',
				login: request.query.username,
				err : err
			});
		});
	});

	app.get('/logout', function (request, response) {
		request.logout();
		response.send({});
	});
};