'use strict';

angular.module('webApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'pascalprecht.translate',
  'LocalStorageModule',
  'config',
]).config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/register', {
      templateUrl : 'views/user/register.html',
      controller : 'UserRegisterCtrl'
    })
    .when('/login', {
      templateUrl : 'views/login.html',
      controller : 'LoginCtrl'
    })
    .when('/logout', {
      //templateUrl : 'views/login.html',
      controller : 'LogoutCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});




