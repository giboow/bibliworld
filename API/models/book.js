'use strict';

var mongoose = require('mongoose');



var Book = new mongoose.Schema({
	bookname: {
		type: String,
		require: true
	},
	isbn : {
		type: String,
		require : true
	}
	createdAt: {
        type: Date,
        'default': Date.now
    }
}, {strict: true});


module.exports = mongoose.model('Book', Book);

