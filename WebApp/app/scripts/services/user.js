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
					}, function(){

					}
				);
			}
			return;
		},
		logout : function(){
			Api.request(
				'/logout',
				{}, function(){
					UserService.currentUser= null;
				}, function(){
			});
		}
	};
});

app.service('UserService',function(){
	return {
		currentUser : null
	};
});