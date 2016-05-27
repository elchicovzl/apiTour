var User,
	hal,
	jwt,
	config,
	docsPerPage,
	pageNumber,
	fileCtrl,
	Q,
	Email;

//modules
User = require('../models/user');
hal = require('hal');
jwt = require('jsonwebtoken');
config = require('../../../config');
fileCtrl = require('./fileController');
Q = require('q');
Email = require('./emailController');

function userController () {

	// Method get all users.
	this.getUsers = function (req, res, next) {

		if(!(typeof req.params.page == 'undefined')) {
			pageNumber = req.params.page;
		}else {
			pageNumber = config.pagination.defaultPageNumber;
		}

		return User.findPaginated(function(err, result) {
			var resources,
			users;

			if(err) {
				res.status = 500;
				console.log('Internal error(%d): %s',res.statusCode,err.message);
        		return res.send({ error: err.message });
			} 

			users = {};
			users.items = result.documents;

			if(!(typeof result.nextPage == 'undefined')) {
				users.nextPage = result.nextPage;
			}

			if(!(typeof result.prevPage == 'undefined')) {
				users.prevPage = result.prevPage;
			}

			resources = [];

			if(err) {

				res.status = 500;
				console.log('Internal error(%d): %s',res.statusCode,err.message);
        		return res.send({ error: 'Server error' });
			}else {
				var resourceCollection,
				resources;

				resourceCollection = new hal.Resource({
					page : pageNumber,
					pageLimit : config.pagination.defaultItemsPerPage,
					total : result.totalPages,
				}, '/users?page='+pageNumber);

	    		resourceCollection.link(new hal.Link("first", "/users?page=1"));

	    		if(!(typeof result.nextPage == 'undefined')) {
	    			resourceCollection.link(new hal.Link("next", "/users?page="+result.nextPage));
				}
				if(!(typeof result.prevPage == 'undefined')) {
	    			resourceCollection.link(new hal.Link("prev", "/users?page="+result.prevPage));
				}

	    		resourceCollection.link(new hal.Link("last", "/users?page="+result.totalPages));

	    		resources = [];

	    		users.items.forEach(function(user, index) {
	    			var userDeserialize;
	    			
	    			user.password = undefined;
	    			userDeserialize = user.toJSON();
				 	resources.push(new hal.Resource(user.toJSON(), "/users/"+userDeserialize.id));
	    		});

	    		resourceCollection.embed("users", resources);
	    		
	    		return res.send(resourceCollection);
			}
		}, config.pagination.defaultItemsPerPage, pageNumber);

	};

	// Method get a one user by id.
	this.getUser = function (req, res, next) {

		return User.findById(req.params.id, function(err, user) {
			
			if(!user) {
				res.statusCode = 404;
				return res.send({ error: 'Not found' });
			}

			if(err) {
				res.statusCode = 500;
		        console.log('Internal error(%d): %s',res.statusCode,err.message);
		        return res.send({ error: 'Server error' });

		    } else {
		    	var resource;

		    	user.password = undefined;
				resource = new hal.Resource(user.toJSON(), '/users/'+req.params.id);
	    		return res.send(resource);
		    }
		});
	};

	// Method create a user.  
	this.createUser = function (req, res, next) {
	    var model = {};

	    if(req.params.name != undefined) model.name = req.params.name;
	    if(req.params.lastName != undefined) model.lastName = req.params.lastName;
	    if(req.params.userName != undefined) model.userName = req.params.userName;
	    if(req.params.email != undefined) model.email = req.params.email;
	    if(req.params.password != undefined) model.password = req.params.password;
	    if(req.params.avatar != undefined) model.avatar = req.params.avatar;
	   
	    model.avatar = req.params.avatar;  
	   
	    User.create(model, function(err, result) {
	    	if(err) {
	    		console.log(err);

	    		if(err.code == 11000) {
	    			res.statusCode = 409;
	    			return res.send({'Server error':err.errmsg});
	    		}

	    		return res.send({'Server error':err});
	    	}else {
	    		var resource;

	    		result.password = undefined;

	    		resource = new hal.Resource(result.toJSON(), '/users/'+result.id);
	    		return res.send(resource);
	    	}
	    });
	};

	function update(id, model) {
		var deferred;

		deferred = Q.defer();
		
		User.where({ _id: id }).update(model, function(err, data) {
			if(err)
				deferred.reject(err); 

			if(model.avatar) {
				fileCtrl.moveFile(model.avatar)
		    		.then(function() {
		    			deferred.resolve(data);
		    		})
		    		.catch(function (err) {
		    			deferred.reject(err);
		    		})
		    	}else {
		    		deferred.resolve(data);
		    	}
		});

		return deferred.promise;
	}

	// Method update a user.
	this.updateUser = function (req, res, next) {
		var model;

		model = {};

		if(req.params.name) model.name = req.params.name;
		if(req.params.lastName) model.lastName = req.params.lastName;
		if(req.params.userName) model.userName = req.params.userName;
		if(req.params.email) model.email = req.params.email;
		if(req.params.cPassword) model.cPassword = req.params.cPassword;
		if(req.params.nPassword) model.password = req.params.nPassword;
		if(req.params.avatar) model.avatar = req.params.avatar;


		if(model.cPassword) {
			User.findById(req.params.id, function(err, user) {

				if(err) {
					res.statusCode = 500;
		    		return res.send({'Server error':err});
				}

				user.comparePassword(model.cPassword, function(err, isMatch) {
					
					if (err) {
						res.statusCode = 500;
		    			return res.send({'Server error':err});
					}

					if(isMatch) {
						update(req.params.id, model)
							.then(function() {

								res.statusCode = 204;
								return res.send("nothing");
							}, function(err) {

								res.statusCode = 500;
					    		return res.send({'Server error':err});
							})
					}else {
						res.statusCode = 400;
		    			return res.send({error:err, message: 'current password not match'});
					}
				})	
			});
		}else {
			update(req.params.id, model)
				.then(function() {

					res.statusCode = 204;
					return res.send("nothing");
				}, function(err) {

					res.statusCode = 500;
		    		return res.send({'Server error':err});
				})
		}
	};

	// Method delete a user. 
	this.deleteUser = function (req, res, next) {
		
		return User.findById(req.params.id, function(err, user) {
			if(!user) {
				res.statusCode = 404;
				return res.send({ error: 'Not found' });
			}
			
			return user.remove(function(err) {
				if(err) {
					res.statusCode = 500;
			        console.log('Internal error(%d): %s',res.statusCode,err.message);
			        return res.send({ error: 'Server error' });
				}else {
					res.statusCode = 204;
					return res.send("nothing");	
				}
			});		
		});
	};

	// Method validate a user token
	this.requireLogin = function(req, res, next) {
		var decoded,
			token;
		
		if (req.session && req.session.token || typeof req.headers['auth-token'] != "undefined") {

			token = req.session.token || req.headers['auth-token'];

			try {
			    decoded = jwt.verify(token, config.security.secretToken);
			} catch(err) {
			  // err
			  res.send({"message":"require permisions1."});
			}

			next();
		}else {
			res.send({ message:"require permisions2." });
		}
	}

	//method validate users form fields required
	this.requireFields = function(req, res, next) {
		var model;

		if(req.params.userName && req.params.email && req.params.password) {
			next();
		}else {
			res.statusCode = 400;
			res.send({ message:"You didn't provide a required parameter."});
		}
	  
	}

	// method for login
	this.login = function(req, res, next) {

		User.getAuthenticated(req.params.username, req.params.password, function(err, user, reason) {
			var reasons,
				token,
				data;

			if (err) throw err;

			if (user) {
	            // create a token.
			    token = jwt.sign({username:user.userName, password:user.password , id:user.id}, config.security.secretToken, {
		        	expiresInMinutes: 1440 // expires in 24 hours
		        });

	            req.session.token = token;

	            user.password = undefined;

	            data = {
	            	user : user,
	            	token: token
	            }

	            res.send(data);
	        }

	        // otherwise we can determine why we failed
	        reasons = User.failedLogin;

	        switch (reason) {
	            case reasons.NOT_FOUND:
	            case reasons.PASSWORD_INCORRECT:
	            	res.statusCode = 401;
	            	res.send({ error:401, message: "password or user incorrect"});
	                break;
	            case reasons.MAX_ATTEMPTS:
	                // temporarily locked
	                res.statusCode = 401;
	                res.send({ error:401, message: "max attempts"});
	                break;
	        }
		})
	}

	//method for logout
	this.logout = function(req, res, next) {
		req.session.reset();
		res.send({ message:"finish session." });
	}

	//reset attempts 
	this.resetAttempts = function(req, res, next) {

		return User.findById(req.params.id, function(err, user) {

			if(!user) {
				res.statusCode = 404;
				return res.send({ error: 'Not found' });
			}

			user.lockUntil = 0;
			user.loginAttempts = 0;

			return user.save(function(err, result) {

				if(err) {
					console.log(err);
	    			return res.send({'Server error':err});
				}else {
		    		return res.send({'result':resource.toJSON(),'status':200});
				}	
			});	
		});

	}


	this.forgot = function(req, res, next) {
		var reasons;

		User.compareEmail(req.params.email, function(err, user, reason) {
			if(err) {
				console.log(err);
				res.send(err);
			}

			if(user) {
				Email.sendEmail(user).then(function(data) {
					return res.send({message: 'An e-mail has been sent to ' + user.email + ' with further instructions.'});
				}, function(err) {
					res.status = 500;
		    		return res.send({'Server error':err});
				})
			}

			reasons = User.failedLogin;

			switch (reason) {
	            case reasons.NOT_FOUND:
	            	res.statusCode = 401;
	            	res.send({ error:401, message: "No account with that email address exists."});
	                break;
	            case reasons.MAX_ATTEMPTS:
	                // temporarily locked
	                res.statusCode = 401;
	                res.send({ error:401, message: "max attempts"});
	                break;
	        }
		});
	}

	this.validToken = function(req, res, next) {
		User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } },
			function(err, user) {
				if (!user) {
					res.statusCode = 401;
      				return res.send({error: 401, message: 'Password reset token is invalid or has expired.'});
    			}

    			user.password = undefined;

    			res.statusCode = 200;
    			res.send(user);

			});
	}

	this.resetPassword = function(req, res, next) {

		if (req.params.nPassword != req.params.rPassword) {
			res.status = 500;
			return res.send({error:500, message:'Password not match' });
		}

		update(req.params.id, {password : req.params.nPassword})
			.then(function() {
				res.statusCode = 202;
				return res.send({message: 'Password successfully updated'});
			}, function(err) {

				res.status = 500;
	    		return res.send({error:500, message: err.message});
			})
	}

	return this;
}

module.exports = new userController();