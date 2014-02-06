'use strict';

module.exports = function (app) {

	/*app.get('/', function (request, response) {
		response.send("Bienvenue sur l'api de bibliworld");
	});*/

	app.get('/', function (req, res) {
        res.send({ user : req.user });
    });
};