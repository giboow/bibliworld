'use strict';

//Inti mongoDb
function initMongoDb() {
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
}



//Passport init
function initPassport() {
	var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

	passport.use(new LocalStrategy({
			usernameField : 'username',
			passwordField : 'password'
		}, function (username, password, done) {
			var User = require('../models/user').User;
			User.authenticate(username, password, function (error, user) {
					return done(error, user);
				}
			);
		}
	));

	passport.serializeUser(function (user, done) {
			done(null, user.id);
		}
	);

	passport.deserializeUser(function (id, done) {
			done(null, {id: 1});
		}
	);
}

module.exports = function (app) {
	initMongoDb(app);
	initPassport(app);
};


