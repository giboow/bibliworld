'use strict';

module.exports = function () {

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
				swagger.errors.invalid('user/password')
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
					} else {
						return res.send({
							'code' : 400,
							'message' : 'Invalid user/password'
						}, 400);
					}
				});
			}
		}
	};
	swagger.addPost(userLogin);

	var userLogout = {
		'spec': {
			description : 'Log into application',
			path : '/user/logout',
			method: 'GET',
			summary : 'Logout from the app',
			notes : 'Returns an array with session state',
			type : 'array',
			nickname : 'userLogout',
			produces : ['application/json'],
		},
		'action': function (request, response) {
			request.session.destroy(function () {
			
				return response.send({
					error: false,
					destroy: true
				});
			});
		}
	};
	swagger.addGet(userLogout);


	var userRegister = {
		'spec': {
			description : 'Log into application',
			path : '/user/register',
			method: 'POST',
			summary : 'Register user',
			notes : 'Returns an array info with id and username infos',
			type : 'array',
			nickname : 'userRegister',
			produces : ['application/json'],
			parameters : [
				swagger.queryParam('username', 'User name', 'string', true),
				swagger.queryParam('password', 'User password', 'string', true),
				swagger.queryParam('email', 'User email', 'string', true),
			],
			responseMessages : [
				swagger.errors.invalid('username'),
				swagger.errors.invalid('password'),
				swagger.errors.invalid('email'),
				swagger.errors.invalid('User allready exist'),
			]
		},
		'action': function (req, res) {
			var username  = req.query.username,
				email = req.query.email,
				password = req.query.password;

			if (!username) {
				throw swagger.errors.invalid('username');
			}
			if (!password) {
				throw swagger.errors.invalid('password');
			}
			if (!email) {
				throw swagger.errors.invalid('email');
			}

			User.register(username, email, password, function (err, user) {
				if (!err) {
					return res.send({
						username : user.username,
						email : user.email
					});
				} else {
					return res.send({
						code : 400,
						message : "invalid User allready exist"
					}, 400);
				}
			});
		}
	};
	swagger.addGet(userRegister);
};


