'use strict';
var app = angular.module('webApp');

app.service('AuthenticationService',function($resource, Api, UserService){
	return {
		login : function(username, password) {
			if(username && password) {
				Api.request(
					'/login', {
						username: username,
						password: password,
					}, function(datas){
						UserService.currentUser = datas;
						console.log(datas);
					}
				);
			}
			return;
		},
		logout : function(){
			Api.request(
				'/logout',
				{}, function (){
					UserService.currentUser= null;
				}, function (){}
			);
		},
		register : function(email, password, done) {
			Api.request(
				'/user/register', {
					email : email,
					password : password
				}, function (datas) {
					if (typeof done === 'function') {
						return done(null, datas);
					}
				}, function (err) {
					if (typeof done === 'function') {
						return done(err, null);
					}
				}
			);
		}
	};
});




app.service('UserService',function(){
	return {
		currentUser : null
	};
});