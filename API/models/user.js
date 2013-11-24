
'use strict';


var mongoose = require('mongoose'),
	mongooseTypes = require('mongoose-types');

mongooseTypes.loadTypes(mongoose, 'email');


var UserSchema = new mongoose.Schema({
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


UserSchema.statics.createUser = function (email, password, callback) {
	var user = new User({
		email: email,
		password : password
	});

	user.save(function (err) {
			callback(err, user);
		}
	);
};


UserSchema.statics.authenticate = function (email, password, callback) {
    this.findOne({email: email}, function (err, user) {
        if (!user) {
			return callback('cannot find user');
        }

        if (user.password === password) {
			return callback(null, user);
		}
        
        return callback('invalid password');
    });
};


var User = mongoose.model('User', UserSchema);
exports.User = User;


