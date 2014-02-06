'use strict';

//console.log(needsGroup("admin"));

module.exports = function (app) {
	app.get('/book/register', function (request, response) {
		var isbn = request.query.isbn;
		if (isbn) {
			var books = require('google-books-search');
			books.search(isbn, {
				
			});
		}
		response.send({});
	});

	app.get('/book/add', function (request, response) {
		var Book = require('../models/book');
		response.send('hey');
	});
};