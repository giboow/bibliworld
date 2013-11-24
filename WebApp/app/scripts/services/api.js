'use strict';

var app = angular.module('webApp');

app.service('Api', function($http, CONF) {
		return {
			request : function(uri, params, successCallback, errorCallback){
				$http.get(
					CONF.api+uri,
					{
						params : params
					}
				).success(function(data, status, headers, config){
						if (typeof(successCallback) === 'function') {
							successCallback(data, status, headers, config);
						}
					}
				).error(function(data, status, headers, config) {
						if (typeof(errorCallback) === 'function') {
							errorCallback(data, status, headers, config);
						}
					}
				);
			},
			getHost : function() {
				return CONF.api;
			}
		};
	}
);