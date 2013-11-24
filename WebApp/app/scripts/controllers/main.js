'use strict';

var app = angular.module('webApp');

app.controller('MainCtrl', function () {
	
});

app.controller('LoginCtrl', function ($scope, AuthenticationService) {
	$scope.login = function(){
		AuthenticationService.login($scope.username, $scope.password);
	};
});