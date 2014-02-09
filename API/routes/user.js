'use strict';

module.exports = function (app) {

	var swagger = require('swagger-node-express');

	var User = require('../models/user');

	var userLogin = {
		'spec': {
			description : 'Log into application',
			path : '/user/login',
			method: 'POST',
			summary : 'Log into app with username/password',
			notes : 'Returns an array info with id and username infos',
			type : 'array',
			nickname : 'userLogin',
			produces : ['application/json'],
			parameters : [
				swagger.queryParam('username', 'User name', 'string', true),
				swagger.queryParam('password', 'User password', 'string', true),
			],
			responseMessages : [
				swagger.errors.invalid('username'),
				swagger.errors.invalid('password'),
				swagger.errors.invalid('username/password')
			]
		},
		'action': function (req, res) {
			var datas = {error: false};

			var username = req.query.username,
				password = req.query.password;

			if (!username) {
				throw swagger.errors.invalid('username');
			}
			if (!password) {
				throw swagger.errors.invalid('password');
			}
							
			// test user session
			var userSession = req.session.user;
			if (userSession) {
				datas.sessionCreate = false;
				datas.user = userSession;

				return res.send(datas);
			} else {
				User.authenticate(username, password, function (err, user) {
					if (!err) {
						datas.sessionCreate = true;
						req.session.user = datas.user = {
							id : user.userid,
							username : user.username,
						};

						return res.send(datas);
					}
				});
			}

			throw swagger.errors.invalid('username/password');
		}
	};
	swagger.addGet(userLogin);


	app.get('/logout', function (request, response) {
		request.session.destroy(function () {
			
			return response.send({
				error: false,
				destroy: true
			});
		});
	});


	app.get('/user/register', function (req, res) {
		var datas = {error : false};

		var username  = req.query.username,
			email = req.query.email,
			password = req.query.password;

		User.register(username, email, password, function (err, user) {
			if (err) {
				datas.error  = {
					code : 102,
					message : 'User allready Exist'
				};
			} else {
				datas.user = {
					username : user.username,
					email : user.email
				};
			}

			res.send(datas);
		});
	});
};


