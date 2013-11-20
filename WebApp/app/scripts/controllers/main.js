'use strict';

angular.module('webApp')
.controller('MainCtrl', function ($scope, AuthenticationService) {
	$scope.login = function(){
		AuthenticationService.login($scope.username, $scope.password);
	}
});

