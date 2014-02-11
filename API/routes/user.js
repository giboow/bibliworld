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
			type : 'User',
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

				return res.send(user);
			} else {
				User.authenticate(username, password, function (err, user) {
					if (!err) {
						
						var userJson = user.toJson();
						req.session.user = userJson;

						return res.send(userJson);
					} else {
						console.log(err);
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


	swagger.addModels({
		'logoutResponse'  :{
			'required' : ['destroy'],
			'properties' : {
				'destroy' : {'type' : 'boolean'}
			}
		}
	});
	var userLogout = {
		'spec': {
			description : 'Log into application',
			path : '/user/logout',
			method: 'GET',
			summary : 'Logout from the app',
			notes : 'Returns an array with session state',
			type : 'logoutResponse',
			nickname : 'userLogout',
			produces : ['application/json'],
		},
		'action': function (request, response) {
			request.session.destroy(function () {
			
				return response.send({
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
			type : 'User',
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
					return res.send(user.toJson());
				} else {
					if("errors" in err) {
						if("email" in err.errors) {
							return res.send({
								code : 400,
								message : 'invalid email'
							}, 400);	
						}
					} else {
						if(err.code === 11000) {
							return res.send({
								code : 400,
								message : 'invalid User allready exist'
							}, 400);
						}
					}
					return res.send({
						code : 400,
						message : err.message
					}, 400);
				}
			});
		}
	};
	swagger.addGet(userRegister);
};


