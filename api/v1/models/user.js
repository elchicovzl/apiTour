module.exports = (function userSchema () {
	var mongoose,
	collectionName,
	schema,
	user,
	UserModel,
	bcrypt,
	SALT_WORK_FACTOR,
	MAX_LOGIN_ATTEMPTS,
	LOCK_TIME,
	reasons,
	mongoosePages,
	crypto,
	async;

	//modules
	bcrypt        = require('bcrypt');
	crypto        = require('crypto');
	async         = require('async');
	mongoose      = require('./db').mongoose;
	mongoosePages = require('mongoose-pages');
	
	collectionName = 'users';

	//constants
	SALT_WORK_FACTOR = 10;

	// max of 5 attempts, resulting in a 2 hour lock
	MAX_LOGIN_ATTEMPTS = 50;
	LOCK_TIME = 2 * 60 * 60 * 1000; 

	schema = {
		name: {
			type: String,
			required: false
		},
		lastName: {
			type: String,
			required: false
		},
		userName: {
			type: String,
			required: true,
			unique: true,
			dropDups: true
		},
		email: {
			type: String,
			required: true,
			unique: true,
			dropDups: true
		},
		password: {
			type: String,
			// select: false,
			required: true
		},
		avatar: {
			type : String,
			required: false 
		},
		resetPasswordToken: String,
  		resetPasswordExpires: Date
		// loginAttempts: {
		// 	type: Number,
		// 	require: true,
		// 	default: 0
		// },
		// lockUntil: {
		// 	type: Number
		// }
	};

	user = mongoose.Schema(schema);

	mongoosePages.skip(user);

	user.set('toJSON', {
	     transform: function (doc, ret, options) {
	         ret.id = ret._id;
	         ret.items = ret.documents;
	         delete ret._id;
	         delete ret.__v;
	     }
	}); 

	user.virtual('isLocked').get(function() {
		// check for a future lockUntil timestamp
		return !!(this.lockUntil && this.lockUntil > Date.now());
	})

	user.pre('save', function(next) {
		var user = this;

		// only hash the password if it has been modified (or is new)
		if (!user.isModified('password')) return next();

		console.log("encrypt password.");
		//generate a salt
		bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
			if (err) return next(err);

			//hash the password using our new salt
			bcrypt.hash(user.password, salt, function(err, hash) {
	            if (err) return next(err);

	            // override the cleartext password with the hashed one
	            user.password = hash;
	            next();
	        }); 
		})
	});

	user.pre('update', function(cb) {
		var user,
		password;

		user = this;
		password = user._update.$set.password;

		if(password == undefined) return cb(null,null);

		console.log("encrypt password.");

		//generate a salt
		bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
			if (err) return cb(true,null);

			//hash the password using our new salt
			bcrypt.hash(password, salt, function(err, hash) {
	            if (err) return next(err);

	            // override the cleartext password with the hashed one
	            user._update.$set.password = hash;
	            cb(null, password);
	        }); 
		})
	});

	user.methods.comparePassword = function(candidatePassword, cb) {
		bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
	        if (err) return cb(err);
	        cb(null, isMatch);
	    });
	}

	
	// user.methods.incLoginAttempts = function(cb) {
	// 	var updates;

	// 	// if we have a previous lock that has expired, restart at 1
	//     if (this.lockUntil && this.lockUntil < Date.now()) {
	//         return this.update({
	//             $set: { loginAttempts: 1 },
	//             $unset: { lockUntil: 1 }
	//         }, cb);
	//     }

	//     // otherwise incrementing
	//     updates = { $inc: { loginAttempts: 1 } };

	//     // lock the account if we've reached max attempts and it's not locked already
	//     if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
	//         updates.$set = { lockUntil: Date.now() + LOCK_TIME };
	//     }

	//     return this.update(updates, cb);
	// }

	reasons = user.statics.failedLogin = {
	    NOT_FOUND: 0,
	    PASSWORD_INCORRECT: 1,
	    MAX_ATTEMPTS: 2
	};

	user.static('compareEmail', function (email, cb) {

		this.findOne({email:email}, function(err, user) {
			if(err) return cb(err);

			if (!user) {
	            return cb(null, null, reasons.NOT_FOUND);
	        }

	        async.waterfall([
	        	function(done) {
				    crypto.randomBytes(20, function(err, buf) {
				    	var token = buf.toString('hex');
				        done(err, token);
				    });
			    },

			    function(token, done) {
			        user.resetPasswordToken = token;
			        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

			        user.save(function(err) {
			        	return cb(err, user, null);
			        });
				    
				},
	        	
	        ], function(err) {
			    	if (err) return cb(err, null, null);
			});
		});
	});

	user.static('getAuthenticated', function (username, password, cb) {

		this.findOne({ userName: username }, function(err, user) {

			if (err) return cb(err);
		
			// make sure the user exists
			if (!user) {
	            return cb(null, null, reasons.NOT_FOUND);
	        }

	        // check if the account is currently locked
	        // if (user.isLocked) {
	            // just increment login attempts if account is already locked
	        //     return user.incLoginAttempts(function(err) {
	        //         if (err) return cb(err);
	        //         return cb(null, null, reasons.MAX_ATTEMPTS);
	        //     });
	        // }

	        // test for a matching password
	        user.comparePassword(password, function(err, isMatch) {
	        	var updates;

	        	if (err) return cb(err);
	        	
	        	// check if the password matchs
	        	if (isMatch) {
	                // if there's no lock or failed attempts, just return the user
	                // if (!user.loginAttempts && !user.lockUntil) 
	                return cb(null, user);
	                // reset attempts and lock info
	                // updates = {
	                //     $set: { loginAttempts: 0 },
	                //     $unset: { lockUntil: 1 }
	                // };
	                // return user.update(updates, function(err) {
	                //     if (err) return cb(err);
	                //     return cb(null, user);
	                // });
	            }

	            // password is incorrect, so increment login attempts before responding	
	            return cb(null, null, reasons.PASSWORD_INCORRECT);
	            // user.incLoginAttempts(function(err) {
	            //     if (err) return cb(err);

	            //     return cb(null, null, reasons.PASSWORD_INCORRECT);
	            // });
	        });	


		});

	});

	UserModel = mongoose.model(collectionName, user);
	
	return UserModel;
})();