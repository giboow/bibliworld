'use strict';


var mongoose = require('mongoose'),
	mongooseTypes = require('mongoose-types'),
    passportLocalMongoose = require('passport-local-mongoose');

mongooseTypes.loadTypes(mongoose, 'email');


var UserSchema = new mongoose.Schema({
	username: {
		type: String,
		require: true
	},
	email : {
		type : mongoose.SchemaTypes.Email,
		unique: true,
		sparse: true,
		required: true,
		index: {
			dropDups: true
		}
	},
	password : {
		type : String,
		required: true,
	},
	createdAt: {
        type: Date,
        'default': Date.now
    }
}, {strict: true});


UserSchema.statics.register = function (username, email, password, callback) {
	var user = new User({
		username : username,
		email: email,
		password : password
	});

	user.save(function (err) {
			callback(err, user);
		}
	);
};


UserSchema.statics.authenticate = function (username, password, callback) {
    this.model('User').findOne({'username': username}, function (err, user) {
    	console.log(err);

    	console.log(username);
        if (!user) {
			return callback('cannot find user');
        }

        if (user.password === password) {
			return callback(null, user);
		}
        
        return callback('invalid password');
    });
};



var User = module.exports = mongoose.model('User', UserSchema);
