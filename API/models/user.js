'use strict';

var swagger = require('swagger-node-express');

var swaggerModel = {
	'User' : {
		'required' : ['username', 'password', 'email'],
		'properties' : {
			'username' : {
				'type' : 'string',
				'description' : 'Unique User name'
			},
			'email' : {
				'type' : 'email',
				'description' : 'User email address'
			}

		}
	}
};
swagger.addModels(swaggerModel);



var mongoose = require('mongoose');
var mongooseTypes = require('mongoose-types');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

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

UserSchema.pre('save', function (next) {
	var user = this;
	
	if (!user.isModified('password')) {return next(); }

	bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
		
		if (err) {
			return next(err);
		}
		
		bcrypt.hash(user.password, salt, function (err, hash) {
			user.password = hash;

			return next();
		});
	});
});


UserSchema.statics.register = function (username, email, password, callback) {
	var User = this.model('User');
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
        if (!user) {
			return callback({
				code : 102,
				message : 'unknow user'
			});
        }

        user.comparePassword(password, function (err, isMatch) {
			if (err) {
				console.log(err);
				return callback({
					code : 103,
					message : 'Invalid password'
				});
			} else {
				if (isMatch) {
					return callback(null, user);
				} else {
					return callback({
						code : 101,
						message : 'Invalid password'
					});
				}
			}
        });
    });
};

UserSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        
        if (err) { return callback(err); }

        return callback(null, isMatch);
    });
};

UserSchema.methods.toJson = function () {
	return {
		username : this.username,
		email : this.email
	};
};

module.exports = mongoose.model('User', UserSchema);
