'use strict';

var app = angular.module('webApp');

app.controller('UserRegisterCtrl', function ($scope, AuthenticationService, $location) {
	$scope.register = function () {
		AuthenticationService.register($scope.email, $scope.password, function(err, datas){
			if(err) {
				// error treatment
				return;
			}
			if (datas.err) {

				if (datas.err.code === 11000) {
					$scope.error = 'Duplicate entry';
				}
				return;
			}
			$location.path('/login');
		});
	};
});