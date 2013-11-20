'use strict';

app.service("AuthenticationService", function($rootScope, $resource, $http, CONF, UserService, localStorageService) {
	return {
		login : function(username, password) {
			var identityInStore = localStorageService.get('identity');
			if (!identityInStore) {
				if(username && password) {
					$http.get(
						CONF.api+"/login", 
						{
							params : {
								username: username, 
								password: password,
							}
						}
					).success(function(datas){
						console.log(datas);
					}).error(function(){
						
					});
				} 
			}
			return "";
		}
		logout : function(){
			$http.get(CONF.api+"/login").success(function(datas){
				console.log(datas);
			}).error(function(){

			});
		}
	};
});

app.service('UserService', function($rootScope){
  	return {
		currentUser: null,
  	};
});