'use strict';

module.exports = function (app) {

	var swagger = require('swagger-node-express');

	var User = require('../models/user');

	var userLogin = {
		'spec': {
		    description : "Operations about pets",  
		    path : "/user/login/{username}/{password}",
		    method: "GET",
		    summary : "Log into application",
		    notes : "Return user infos",
		    //type : "Pet",
		    nickname : "userLogin",
		    produces : ["application/json"],
		    parameters : [
		    	swagger.pathParam("username", "User name", "string"),
		    	swagger.pathParam("password", "User password", "string"),
	    	],
		    responseMessages : [swagger.errors.invalid('id'), swagger.errors.notFound('pet')]
	  	},
	  	'action': function (req, res) {
			var datas = {error: false};

			var username = req.params.username,
				password = req.params.password;
				
			// test user session
			var userSession = req.session.user;
			if (userSession) {
				datas.sessionCreate = false;
				datas.user = userSession;
			
				return res.send(datas);
			}

			User.authenticate(username, password, function (err, user) {
				if (err) {
					datas.error = {
						code : 101,
						message : 'Invalid User/Pass'
					};
				} else {
					datas.sessionCreate = true;
					req.session.user = datas.user = {
						id : user.userid,
						username : user.username,
					};
					
				}
			
				return res.send(datas);
			});
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


