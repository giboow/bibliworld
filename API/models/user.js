'use strict';


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
			return callback('cannot find user');
        }

        user.comparePassword(password, function (err, isMatch) {
			if (err) {
				return callback('Error check password');
			} else {
				if (isMatch) {
					return callback(null, user);
				} else {
					return callback('Invalid password');
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

module.exports = mongoose.model('User', UserSchema);
