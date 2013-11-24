'use strict';

var app = angular.module('webApp');

app.controller('NavController', function($scope,UserService) {
	$scope.currentUser = UserService.getCurrentUser;
	$watch(UserService.currentUser, function() {
		
	});
});