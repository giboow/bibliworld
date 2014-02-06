'use strict';

module.exports = function (app) {

	var User = require('../models/user');

	app.get('/login', function (req, res) {
		var datas = {error: false};

		var username = req.query.username,
			password = req.query.password;
			
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
	});

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


