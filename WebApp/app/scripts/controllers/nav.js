'use strict';

var app = angular.module('webApp');

app.controller("NavController", function($scope, $location, AuthenticationService, UserService) {
    $scope.currentUser = UserService.getCurrentUser;
});