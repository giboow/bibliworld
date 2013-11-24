'use strict';

module.exports = function () {
	var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

	passport.use(new LocalStrategy({
			usernameField : 'username',
			passwordField : 'password'
		}, function (username, password, done) {
			var User = require('../../models/user').User;
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
};