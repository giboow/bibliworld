'use strict';
var app = angular.module('webApp');

app.service('AuthenticationService',function($resource,$http,CONF,UserService){
	return {
		login : function(username, password) {
			if(username && password) {
				$http.get(
					CONF.api+'/login',
					{
						params : {
							username: username,
							password: password,
						}
					}
				).success(
					function(datas){
						UserService.currentUser = datas;
					}
				).error(
					function(){

					}
				);
			}
			return;
		},
		logout : function(){
			$http.get(CONF.api+'/logout').success(
				function(){
					UserService.currentUser= null;
				}
			).error(
				function(){
			});
		}
	};
});

app.service('UserService',function(){
	return {
		currentUser : null
	};
});