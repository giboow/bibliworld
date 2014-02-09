'use strict';

module.exports = function (app, express) {
	var swagger = require('swagger-node-express');
	
	swagger.setAppHandler(app);
	



	var docsHandler = express.static(__dirname + '/../../../node_modules/swagger-node-express/swagger-ui/');
	app.get(/^\/docs(\/.*)?$/, function (req, res, next) {
		
		if (req.url === '/docs') { // express static barfs on root url w/o trailing slash
			res.writeHead(302, { 'Location' : req.url + '/' });
			res.end();
			return;
		}
		// take off leading /docs so that connect locates file correctly
		req.url = req.url.substr('/docs'.length);
		return docsHandler(req, res, next);
	});

};