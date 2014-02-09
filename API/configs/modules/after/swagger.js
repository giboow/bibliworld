'use strict';

module.exports = function (app, express) {
	var swagger = require('swagger-node-express');

	
	swagger.configureSwaggerPaths("", "api-docs", "");
	swagger.configure("http://localhost:8002", "0.0.1");

	swagger.setApiInfo({
	  title: "Swagger Sample App",
	  description: "This is a sample server Petstore server. You can find out more about Swagger at <a href=\"http://swagger.wordnik.com\">http://swagger.wordnik.com</a> or on irc.freenode.net, #swagger.  For this sample, you can use the api key \"special-key\" to test the authorization filters",
	  termsOfServiceUrl: "http://helloreverb.com/terms/",
	  contact: "apiteam@wordnik.com",
	  license: "Apache 2.0",
	  licenseUrl: "http://www.apache.org/licenses/LICENSE-2.0.html"
	});
};
